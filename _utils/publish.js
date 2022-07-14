const config = require("../_config/config.json");
const secrets = require("../_config/secrets.json");
const fs = require("fs").promises;
const fetch = require('node-fetch');

const { getConfig } = require("./config");

(async () => {
  // Get story from API so we can keep the metadata
  const config_id = process.env.npm_config_project;
  const config = await getConfig(config_id);
  const storyId = config.composer;
  const draftApi = `https://api.inquirer.com/v1/draft-revision?apikey=${secrets.draft_apikey}&storyId=${storyId}`;

  const storyResponse = await fetch(draftApi);
  const storyData = await storyResponse.json();

  console.log(draftApi);

  // Read in the content
  const htmlBuffer = await fs.readFile('./dist/index.html');

  // Update Paths
  const html = htmlBuffer.toString().replace(/__PATH__/g, 'https://interactives.inquirer.com/' + config.s3);

  // Replace the story's content elements with one raw_html block with the new content
  storyData.ans.content_elements = [{
    type: 'raw_html',
    content: html
  }];

  // Post the story to the API (old metadata + new content)
  const response = await fetch(draftApi, {
    method: 'PUT',
    body: JSON.stringify(storyData),
    headers: { 'Content-Type': 'application/json' }
  });
  const json = await response.json();
  console.log(json);

  console.log(`You still need to click Update in Composer to publish.`)
  console.log(`https://pmn.arcpublishing.com/composer/edit/${storyId}/`)
})();
