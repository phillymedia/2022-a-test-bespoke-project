const fs = require("fs");
const fetch = require("node-fetch");
const Gootenberg = require("gootenberg");
const parsers = require("./parsers");

const secrets = require("../_config/secrets.json");
const { getConfig } = require( "./config" );

const cleanupArchieObject = async (obj) => {
  const entries = Object.entries(obj);
  const isObject = (val) => typeof val === "object" && !Array.isArray(val);

  const keysToLowerCase = obj => Object.fromEntries(
    Object.entries(obj).map(([k, v]) => [k.toLowerCase(), v])
  );

  if (obj.type) {
    obj.type = obj.type.toLowerCase();
  }

  if (isObject(obj.value)) {
    obj.value = keysToLowerCase(obj.value);
  }

  const parser = obj && parsers[obj.type];

  if (parser) {
    await parser( obj );
  }

  for (var i = 0; i < entries.length; i++) {
    let [key, entry] = entries[i];

    if (Array.isArray(entry)) {
      for (var j = 0; j < entry.length; j++) {
        await cleanupArchieObject(entry[j]);
      }
    } else if (isObject(entry)) {
      entry = keysToLowerCase(entry);
      await cleanupArchieObject(entry);
    }
  }
};

async function fetchDocs(type, files, parser) {
  if (!files) return;

  let names = Object.keys(files);

  for (let i = 0; i < names.length; i++) {
    const filename = names[i];
    let data;

    if (type == 'docs') {
      data = await parser(files[filename], {
        suggestionsViewMode: 'PREVIEW_SUGGESTIONS_ACCEPTED' 
      });
    } else {
      data = await parser(files[filename]);
    }

    await cleanupArchieObject(data);
    saveDataToFile( data, filename );
  }
}

function saveDataToFile( data, filename ) {
  if (!fs.existsSync("src/data")) {
    fs.mkdirSync("src/data");
  }
  fs.writeFile(
    `src/data/${filename}.json`,
    JSON.stringify(data, null, "  "),
    (err) => {
      console.log(`Completed ${filename}.json`);
      if (err) {
        console.log(`Unable to write file: ${filename}.json`);
      }
    }
  );
}

async function fetchComposerStory(id) {
  try {
    const response = await fetch(
      `https://api.inquirer.com/v1/arc-content?apikey=L7ABFZ8CJuAs1JyeK75UQtbBoGtfoG0M&_id=${id}&published=false`
    );
    const story = await response.json();

    if( !story || story.message ) {
      return false;
    }

    const { _id, last_updated_date, display_date, credits, promo_items, label, headlines, subheadlines } = story;
    const extracted = { _id, last_updated_date, display_date, credits, promo_items, label, headlines, subheadlines };

    saveDataToFile( extracted, "story" );
    console.log( `🗞  ${id}`);
  } catch(e) {
    console.log( `⛔️ ${id}`);
  }
}


(async () => {
  const config_id = process.env.npm_config_project;

  const goot = new Gootenberg();
  await goot.auth.oauth(secrets, secrets);
  const config = await getConfig( config_id );

  await fetchDocs('docs', config.docs, goot.parse.archie);
  await fetchDocs('sheets', config.sheets, goot.parse.table);

  await fetchComposerStory( config.composer );
})();
