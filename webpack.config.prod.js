// webpack.prod.js
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const Dotenv = require("dotenv-webpack");
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

require("dotenv").config({ path: __dirname + "/.env" });

const imageInlineSizeLimit = parseInt(
  process.env.IMAGE_INLINE_SIZE_LIMIT || '10000'
)

module.exports = {
  mode: "production",
  devtool: "source-map",
  entry: path.resolve(__dirname, 'src/index.js'),
  output: {
    path: path.join(__dirname, "/dist"),
    filename: '[name].[contenthash].js',
    publicPath: '/'
  },
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
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
        test: /\.(jpe?g|png|gif|woff|woff2|eot|ttf|svg|jpg)(\?[a-z0-9=.]+)?$/,
        loader: 'url-loader',
        options: {
          limit: imageInlineSizeLimit,
          name: 'static/media/[name].[hash:8].[ext]'
        }
      }
    ],
  },
  resolve: {
    extensions: ['.tsx', '.js'],
    alias: {
      assets: path.resolve(__dirname, 'src/assets'),
      src: path.resolve(__dirname, 'src')
    }
  },
  plugins: [ 
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'public',
          globOptions: {
            ignore: ['**/index.html'], // Bỏ qua index.html khi sao chép các tệp trong thư mục public
          },
        },
      ],
    }),
    new HtmlWebpackPlugin({
      inject: true,
      template: path.join(__dirname, 'public', 'index.html'),
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      },
      paths: {
        publicURL: '/'
      }
  }),
    new CleanWebpackPlugin(),
    new Dotenv({
      path: path.resolve(__dirname, ".env"),
      safe: path.resolve(__dirname, ".env.example"),
      systemvars: true,
    })
]
};
