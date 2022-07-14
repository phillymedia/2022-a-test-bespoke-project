const config = require("../_config/config.json");
const secrets = require("../_config/secrets.json");

const { Octokit } = require("@octokit/rest");


const octokit = new Octokit({
  auth: secrets.github_token,
});

const getJsonFromRepo = async (repo, path) => {
  try {
    const { data } = await octokit.request(
      "GET /repos/{owner}/{repo}/contents/{path}",
      {
        owner: "phillymedia",
        repo: repo,
        path: path,
      }
    );
    const buffer = Buffer.from(data.content, "base64");
    const text = buffer.toString("utf-8");
    return JSON.parse(text);
  } catch (e) {
    return "";
  }
};

const retrieveConfigById = ( config, id ) => {
  if( Array.isArray( config ) )
    return config.find( x => x.id == id ) || config[0];
  else
    return config;
}

const getConfig = async ( id = "" ) => {

  if( id.substr(0,6) != "__TMP-" )
  {

    const local = retrieveConfigById( config, id );
    console.log( `retrieving custom config ${ local.id } from local project`);
    return local;
  }

  const templates = await getJsonFromRepo("innovator-slack-app-data", "templated.json");
  const remote = retrieveConfigById( templates, id );
  console.log( `retrieving templated config ${ remote.id } from remote`);
  return remote;
}


module.exports = {
  getConfig,
}
