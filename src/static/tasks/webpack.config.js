const _ = require('lodash')
const webpack = require('webpack')
const path = require('path')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')

const pkg = require('../package.json')

const APP_PATH = path.resolve(__dirname, '../application/apps')

module.exports = function (options) {
  options = _.defaults(options || {}, {
    ENV: 'development'
  })

  const isProduction = options.ENV === 'production'

  return {
    context: APP_PATH,
    entry: {
      main: './main/index.jsx',
    },
    output: {
      filename: 'entry/[name].js',
      chunkFilename: 'chunk/[name]-[chunkhash].js',
      publicPath: '/static/apps/'
    },
    module: {
      loaders: [{
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel',
      }, {
        test: /\.css$/,
        loader: "style!css"
      }, {
        test: /\.pcss$/,
        loader: `style!css?${isProduction ? 'minimize&' : ''}module&importLoaders=1!postcss`
      }, {
        test: /\.html$/,
        loader: "raw",
      }, {
        test: /\.(png|jpg|jpeg|gif|woff)$/,
        loader: "file?name=asset/[hash].[ext]"
      }]
    },
    resolve: {
      extensions: ['', '.webpack.js', '.web.js', '.js', '.jsx']
    },
    plugins: [
      new ProgressBarPlugin(),
      new webpack.DefinePlugin({
        __ENV__: {
          ENV: JSON.stringify(options.ENV),
          BUILT_AT: JSON.stringify(+new Date()),
          PKG_NAME: JSON.stringify(pkg.name)
        }
      }),
    ]
  }
}
