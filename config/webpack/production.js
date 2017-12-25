const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./common.js');
const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = merge(common, {
  output: {
    filename: '[chunkhash].[name]'
  },
  plugins: [
    new ExtractTextPlugin('[chunkhash].main.bundle.css'),
    function () {
      this.plugin('done', function (stats) {
        require('fs').writeFileSync(
          path.join(__dirname, '..', '..', 'public', 'assetsHash.json'),
          JSON.stringify(stats.toJson().assetsByChunkName))
      })
    },
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false }
    })
  ]
})
