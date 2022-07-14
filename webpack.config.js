const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    static: "./dev",
    hot: false,
    liveReload: true
  },
  entry: {
    app: path.join(__dirname, "src", "index.tsx"),
    appBar: path.join(__dirname, "preview", "index.tsx"),
    bundle: path.join(__dirname, "src", "bundle.tsx")
  },
  externals: {
    react: "React",
    "react-dom": "ReactDOM",
  },
  target: "web",
  resolve: {
    extensions: [".ts", ".tsx", ".js"]
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
        loader: "string-replace-loader",
        options: {
          search: /__PATH__/g,
          replace: "http://localhost:8080/assets",
        },
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        loader: "file-loader",
      },
    ],
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dev"),
  },
  plugins: [
    new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "preview", "index.html"),
      inject: "body",
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.join(__dirname, "src/assets"),
          to: path.join(__dirname, "dev/assets"),
        },
        {
          from: path.join(__dirname, "preview", "react.js"),
          to: path.join(__dirname, "dev", "react.js"),
        },
        {
          from: path.join(__dirname, "preview", "assets"),
          to: path.join(__dirname, "dev", "preview-assets"),
        }
      ],
    }),
  ],
};
