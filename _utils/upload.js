const path = require('path');
const AWS = require('aws-sdk');
const fs = require('fs');
const mime = require('mime');
const glob = require('glob');

const config = require("../_config/config.json");
const secrets = require("../_config/secrets.json");

const uploadFiles = async (files, dest) => {
  AWS.config.credentials = {
    "accessKeyId": secrets.s3.access_key_id,
    "secretAccessKey": secrets.s3.secret_access_key,
    "region": "us-east-1"
  }

  const s3 = new AWS.S3();

  const totalFiles = files.length;

  const uploadFile = async (file) => {
    console.log('Uploading file', `${totalFiles - files.length}/${totalFiles}`, ':', `https://interactives.inquirer.com/${dest}/${file}`);

    const options = {
      Bucket: 'inq-interactives',
      Key: dest + '/' + file,
      Body: fs.readFileSync('./src/assets/' + file),
      ContentType: mime.getType(file),
      CacheControl: 'max-age=604800'
    };

    s3.putObject(options, async (err) => {
      if (err) {
        console.log('err', err);
        throw err;
      }

      if (files.length > 0) {
        await uploadFile(files.shift());
      }
    })
  }

  await uploadFile(files.shift());
}


const saveDestInConfig = async (dest) => {
  const config_id = process.env.npm_config_project;
  const variant = config.find(x => x.id == config_id) || config[0];

  variant.s3 = dest;
  console.log('saving config');
  fs.writeFileSync('./_config/config.json', JSON.stringify(config, null, 2));
}

(async () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const project = path.dirname(__dirname).split("/").pop().replace(year + '-', '');
  const timestamp = date.getTime();
  const dest = `projects/${year}/${month}/${project}/${timestamp}/assets`;

  const files = glob.sync('**/*', {
    cwd: './src/assets',
    nodir: true
  });

  if (files.length > 0) {
    await uploadFiles(files, dest);
    await saveDestInConfig(dest);
  }
})();
