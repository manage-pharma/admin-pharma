// webpack.dev.js
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");
const Dotenv = require("dotenv-webpack");

require("dotenv").config({ path: __dirname + "/.env" });

module.exports = {
  mode: "development",
  devtool: "eval",
  output: {
    path: path.join(__dirname, "/dist"),
    filename: "bundle.js",
    publicPath: "/",
  },
  plugins: [
    new Dotenv({
      path: path.resolve(__dirname, ".env"),
      safe: path.resolve(__dirname, ".env.example"),
      systemvars: true,
    }),
    new HtmlWebpackPlugin({
      template: "public/index.html",
      publicPath: "/",
      filename: "index.html",
      manifest: "./public/manifest.json",
    }),
    new FriendlyErrorsWebpackPlugin({
      compilationSuccessInfo: {
        messages: ["Build thành công"],
        notes: ["Một số ghi chú: "],
      },
      onWarnings: (warnings) => {
        warnings.forEach((warning, i) => console.warn(`Cảnh báo số ${i + 1}: ${warning}`));
      },
      title: "Cảnh báo từ Webpack",
    }),
  ],
  devServer: {
    magicHtml: true,
    host: "0.0.0.0",
    port: process.env.REACT_PORT,
    allowedHosts: ["all"],
    historyApiFallback: true,
    static: {
      directory: path.join(__dirname, "/public"),
    },
    proxy: {
      "/api": {
        target: process.env.REACT_APP_BE_URL,
        changeOrigin: true,
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: { loader: "babel-loader" },
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        loader: "url-loader",
        options: { limit: false },
      },
    ],
  },
};
