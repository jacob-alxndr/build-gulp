const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  // devtools: '', //
  entry: './src/js/main.js',
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          'style-loader', // Creates `style` nodes from JS strings
          'css-loader', // Translates CSS into CommonJS
          'sass-loader', // Compiles Sass to CSS
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Webpack Tutorial Project', // changes the title of our app
      template: './src/index.html', // pulls the html content from our template html file in the src directory and bundles it in the dist directory.
    }),
  ],
};
