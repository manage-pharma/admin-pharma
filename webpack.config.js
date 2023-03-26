const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const Dotenv = require('dotenv-webpack');
require('dotenv').config({ path: __dirname + '/.env' })
module.exports = {
  output: {
    path: path.join(__dirname, "/dist"), // the bundle output path
    filename: "bundle.js", // the name of the bundle
    publicPath: 'auto',
  },
  plugins: [
    new Dotenv({
      path: path.resolve(__dirname, '.env'),
      safe: path.resolve(__dirname, '.env.example'),
      systemvars: true
    }),
    new HtmlWebpackPlugin({
      template: "public/index.html", // to import index.html file inside index.js
      publicPath: '/',
    }),
  ],
  devServer: {
    magicHtml: true,
    host: '0.0.0.0',
    port: process.env.REACT_PORT, // you can change the port
    allowedHosts: ['all'],
    historyApiFallback: true,
    static: {
      directory: path.join(__dirname, '/public')
    },
    proxy: {
      '/api': {
        target: process.env.REACT_APP_BE_URL,
        changeOrigin: true,
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/, // .js and .jsx files
        exclude: /node_modules/, // excluding the node_modules folder
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.(sa|sc|c)ss$/, // styles files
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/, // to import images and fonts
        loader: "url-loader",
        options: { limit: false },
      },
    ],
  },
};