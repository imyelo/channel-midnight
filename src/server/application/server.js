import koa from 'koa'
import path from 'path'
import views from 'koa-views'
import statics from 'koa-static-cache'
import config from 'config'

const app = koa()

const env = process.env.NODE_ENV
const isProduction = env === 'production'

app.use(views(path.resolve(__dirname, isProduction ? '../../../build/static/template' : '../../static/application/template'), {
  map: {
    ejs: 'ejs'
  }
}))

app.use(statics(path.resolve(__dirname, isProduction ? '../../../build/static/vendor' : '../../static/application/vendor'), {
  prefix: '/static/vendor',
  buffer: isProduction,
  dynamic: !isProduction,
  maxAge: isProduction ? 60 * 60 * 24 * 7 : 0
}))

app.use(statics(path.resolve(__dirname, '../../../build/static/app'), {
  prefix: '/static/app',
  buffer: isProduction,
  dynamic: !isProduction,
  maxAge: isProduction ? 60 * 60 * 24 * 7 : 0
}))


app.use(require('./router').routes())

module.exports = app
