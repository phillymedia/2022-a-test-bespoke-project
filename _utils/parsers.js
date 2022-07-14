const fetch = require("node-fetch");
const Thumbor = require('thumbor');
const secrets = require("../_config/secrets.json");

const deLinkify = (value) => {
  const markDownMatches = value.match(/(?<=\[).*?(?=\])/);
  return value = markDownMatches?.[0] || value;
}

const extractArcId = (value) => {
  value = deLinkify(value);
  value = value.replace(/\/$/, '');
  value = value.replace(/.?http[^\]]*\/([A-Z0-9]*).*/, "$1");

  return value;
}

let prepText = (text) => {
  text = text.replace(/\*\*\*\*(\[[^\)]*\))\*\*\*\*/g, "$1");
  text = text.replace(
    /((?<=\s)|(?<=^))(\*+[\w !"\#$%&'()+,\-./:;<=>?@\[\\\]^_`{|}~]+)(\s+)(\*+)/,
    "$2$3$4"
  );
  text = text.replace("\u000b", "\n");
  text = text.replace(/(^|\n)([*\s]“.*”[^\n]*)(\n|$)/g, "\n>$2\n");
  text = text.replace(/\n/g, "\n\n");
  text = text.replace(/\*\*\*\*(.*)\*\*\*\*/g, "*___$1___*");
  text = text.replace(/\*\*\*([^*]*)\*\*\*/g, "*__$1__*");
  text = text.replace(/^\*\*([^*]*) \*\*/g, "**$1** ");
  text = text.replace(/^\s*\**\s*$/gm, "");
  text = text.replace(/^(\**)\\/g, "$1");
  text = text.replace(/([^\\\n*]?)([*_]+)(\s*)((?:.+?[\w]?))(\s*)(\2)/g, "$1$3$2$4$6$5");

  return text;
};

const thumbor = new Thumbor(secrets.resizer_key, 'https://www.inquirer.com/resizer');

const fetchResizedImageUrl = async (source, size) => {
  if (source) {
    try {
      return thumbor.setImagePath(source.replace('https://', '')).resize(size, 0).buildUrl();
    } catch(e) {
      console.log(e);
    }
  }
}

const TextParser = async (obj) => {
  try {
    obj.value = prepText(obj.value);
  } catch (e) {}
};

const ImageParser = async (obj) => {
  if (obj.value.id) {
    const id = extractArcId(obj.value.id);

    try {
      const response = await fetch(
        `https://api.inquirer.com/v1/arc-photos/${id}?apikey=${secrets.gateway_apikey}`
      );

      const data = await response.json();

      const srcSet = new Array;
      const sizes = [325, 650, 1300, 2600];

      if (!data.additional_properties.published) {
        console.log(`⛔️ You need to publish ${id}`);
        throw new Error('Unpublished');
      }

      await sizes.forEach(async(size) => {
        srcSet.push({
          src: await fetchResizedImageUrl(data.url, size),
          size: size
        });
      });

      obj.value = {
        id: id,
        srcSet: srcSet || [{src: data.src, size: data.width}],
        caption: obj.value.caption || data.caption,
        credit: obj.value.credit || data.credits.by[0].name,
        align: obj.value.align
      };

      if( obj.value.caption == "!" )
        obj.value.caption = "";

      if( obj.value.credit == "!" )
        obj.value.credit = "";

      console.log(`🏙  ${id}`);

      return obj.value;
    } catch (e) {
      console.log(`⛔️ ${id}`);
    }
  }
};

const VideoParser = async (obj) => {
  if (obj.value.id) {
    const id = obj.value.id;

    try {
      const response = await fetch(
        `https://api.inquirer.com/v1/arc-content/?_id=${id}&apikey=${secrets.gateway_apikey}&included_fields=_id,streams,credits,promo_image`
      );
      const data = await response.json();

      obj.value = {
        ...obj.value,
        id: id,
        src: obj.value.src || data.url,
        streams: data.streams,
        caption: obj.value.caption || data.caption,
        credit: obj.value.credit || data.credits.by[0].name,
        poster: data.promo_image ? await fetchResizedImageUrl(data.promo_image.url, 650) : null
      };
      console.log(`🎥 ${id}`);
    } catch (e) {
      console.log(`⛔️ ${id}`);
    }
  }
};

const RelatedParser = async(obj) => {
  if (obj.value.id) {
    const id = extractArcId(obj.value.id);

    try {
      const response = await fetch(
        `https://api.inquirer.com/v1/arc-content?apikey=${secrets.gateway_apikey}&_id=${id}&published=false`
      );
      const data = await response.json();

      obj.value = {
        ...obj.value,
        headlines: data.headlines,
        publish_date: data.publish_date,
        promo_items: data.promo_items,
        credits: data.credits,
        description: data.description,
        website_url: data.website_url
      }

      console.log( `📰 ${ id }`);
    } catch (e) {
      console.log( `⛔️ ${ id }`);
    }
  }
}

const ConversationParser = async(obj) => {
  if (obj.value.quotes) {
    for (let quote of obj.value.quotes) {
      if (quote.image) {
        quote.image = await ImageParser({value: {id: quote.image}});
      }
    }
  }
}

const GraphicParser = async(obj) => {
  if (obj.value.id) {
    obj.value.id = deLinkify(obj.value.id)
  }
}

const LoopingVideoParser = async(obj) => {
  if (obj.value.url) {
    obj.value.url = deLinkify(obj.value.url)
  }

  if (obj.value.poster) {
    obj.value.poster = await ImageParser({value: {id: obj.value.poster}})
  }
}

const HTMLParser = async(obj) => {
  if (obj.value.id) {
    obj.value.id = deLinkify(obj.value.id);
    const id = [...obj.value.id.split('/')].pop();

    try {
      const response = await fetch(
        `https://api.github.com/gists/${id}?client_id=sammorrisdesign`
      )

      const data = await response.json();

      if (!data.files) {
        throw 'Gist Not Found'
      }

      obj.value = {
        ...obj.value,
        code: data?.files?.[Object.keys(data.files)[0]].content
      }

      console.log( `🧰 ${ id }`);
    } catch (e) {
      console.log( `⛔️ ${ id }`);
    }
  }
}

module.exports = {
  text: TextParser,
  image: ImageParser,
  video: VideoParser,
  conversation: ConversationParser,
  related: RelatedParser,
  graphic: GraphicParser,
  html: HTMLParser,
  loopingvideo: LoopingVideoParser,
}
