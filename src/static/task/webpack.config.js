const _ = require('lodash')
const webpack = require('webpack')
const path = require('path')
const APP_PATH = path.resolve(__dirname, '../application/app')

const pkg = require('../package.json')

module.exports = function (options) {
  options = _.defaults(options || {}, {
    ENV: 'development'
  })

  return {
    context: APP_PATH,
    entry: {
      main: './main/index.js'
    },
    output: {
      filename: 'entry/[name].js',
      chunkFilename: 'chunk/[name]-[chunkhash].js',
      publicPath: '/v1/static/app/'
    },
    module: {
      loaders: [{
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'react', 'stage-0']
        }
      }, {
        test: /\.css$/,
        loader: "style!css"
      }, {
        test: /\.less$/,
        loader: "style!css!less?relativeUrls"
      }, {
        test: /\.(png|jpg|jpeg|gif|woff)$/,
        loader: "file?name=asset/[hash].[ext]"
      }]
    },
    resolve: {
      extensions: ['', '.webpack.js', '.web.js', '.js', '.jsx']
    },
    plugins: [
      new webpack.ProgressPlugin(function (percentage, message) {
        const percent = Math.round(percentage * 100);
        process.stderr.clearLine();
        process.stderr.cursorTo(0);
        process.stderr.write(percent + '% ' + message);
      }),
      new webpack.DefinePlugin({
        __ENV__: {
          ENV: JSON.stringify(options.ENV),
          BUILT_AT: JSON.stringify(+new Date()),
          PKG_NAME: JSON.stringify(pkg.name)
        }
      })
    ]
  }
}
