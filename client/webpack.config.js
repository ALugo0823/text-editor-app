const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    //here we add and configure workbox plugins for a service worker and manifest file.
    plugins: [
        new HtmlWebpackPlugin({
          template: "./index.html",
          title: "J.A.T.E",
        }),
        new HtmlWebpackPlugin({
          template: "./index.html",
          chunks: ["install"],
          filename: "install.html",
        }),
        new InjectManifest({
          swSrc: "./src-sw.js",
          swDest: "src-sw.js",
        }),
        new WebpackPwaManifest({
          fingerprints: false,
          inject: true,
          name: "J.A.T.E",
          short_name: "J.A.T.E",
          description: "A text editor using Progressive Web Applications",
          background_color: "#fafafa",
          start_url: "/",
          publicPath: "/",
          crossorigin: "use-credentials",
          icons: [
            {
              src: path.resolve("./src/images/logo.png"),
              sizes: [96, 128, 192, 256, 384, 512],
              destination: path.join("assets", "icons"),
            },
          ],
        }),
      ],
      //here we add CSS loaders and babel to webpack.
      module: {
        rules: [
          {
            test: /\.css$/i,
            use: ["style-loader", "css-loader"],
          },
          {
            test: /\.m?js$/,
            exclude: /node_modules/,
            use: {
              loader: "babel-loader",
              options: {
                presets: ["@babel/preset-env"],
                plugins: [
                  "@babel/plugin-proposal-object-rest-spread",
                  "@babel/transform-runtime",
                ],
              },
            },
          },
        ],
      },
    };
  };