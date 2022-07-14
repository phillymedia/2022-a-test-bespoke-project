const path = require("path");

const { getConfig } = require("./_utils/config");
const config_id = process.env.npm_config_project;

const asyncConfig = async () => {
  const config = await getConfig(config_id);

  return {
    mode: "production",
    entry: {
      app: path.join(__dirname, "src", "index.tsx"),
      bundle: path.join(__dirname, "src", "bundle.tsx")
    },
    externals: {
      react: "React",
      "react-dom": "ReactDOM",
    },
    target: "web",
    resolve: {
      extensions: [".ts", ".tsx", ".js"],
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: "ts-loader",
          exclude: "/node_modules/",
        },
        {
          test: /\.s[ac]ss$/i,
          use: [
            // Creates `style` nodes from JS strings
            "style-loader",
            // Translates CSS into CommonJS
            "css-loader",
            // Compiles Sass to CSS
            "sass-loader",
          ],
        },
        {
          test: /\.(scss|tsx)$/i,
          loader: 'string-replace-loader',
          options: {
            search: /__PATH__/g,
            replace: 'https://interactives.inquirer.com/' + config.s3,
          }
        },
      ],
    },
    output: {
      filename: "[name].js",
      path: path.resolve(__dirname, "dist"),
    }
  }
}

module.exports = asyncConfig;
