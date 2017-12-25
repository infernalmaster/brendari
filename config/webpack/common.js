const webpack = require('webpack')
const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

let config = {
  entry: {
    'main.bundle.js': './src/assets/javascripts/main.js',
    'admin.bundle.js': './src/assets/javascripts/admin.js',
    'main.bundle.css': './src/assets/stylesheets/main.scss'
  },
  output: {
    filename: '[chunkhash].[name]',
    path: path.resolve(__dirname, '../../public/dist'),
    publicPath: '/dist'
  },
  resolve: {
    alias: {
      amber: path.resolve(__dirname, '../../lib/amber/assets/js/amber.js')
    }
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        })
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        })
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        exclude: /node_modules/,
        use: [
          'file-loader?name=/images/[name].[ext]'
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        exclude: /node_modules/,
        use: [
          'file-loader'
        ]
      },
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['env']
        }
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('[chunkhash].main.bundle.css'),
    function () {
      this.plugin('done', function (stats) {
        require('fs').writeFileSync(
          path.join(__dirname, '..', '..', 'public', 'assetsHash.json'),
          JSON.stringify(stats.toJson().assetsByChunkName))
      })
    }
  ]
}

module.exports = config
