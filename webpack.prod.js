const path = require('path');
const merge = require('webpack-merge');
const config = require('./webpack.config');

module.exports = merge(config, {
  mode: 'production', // 'production' || 'development' || 'none'
  // devtools: '', //

  output: {
    filename: 'main-[contentHash].js',
    path: path.resolve(__dirname, 'dist'),
  },
});
