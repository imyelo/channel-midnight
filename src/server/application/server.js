import koa from 'koa'
import path from 'path'
import views from 'koa-views'
import statics from 'koa-static-cache'
import config from 'config'

const app = koa()

const env = process.env.NODE_ENV
const isProduction = env === 'production'

app.use(views(path.resolve(__dirname, isProduction ? '../../../dist/static/templates' : '../../static/application/templates'), {
  map: {
    ejs: 'ejs'
  }
}))

app.use(statics(path.resolve(__dirname, isProduction ? '../../../dist/static/vendors' : '../../static/application/vendors'), {
  prefix: '/static/vendors',
  buffer: isProduction,
  dynamic: !isProduction,
  maxAge: isProduction ? 60 * 60 * 24 * 7 : 0
}))

app.use(statics(path.resolve(__dirname, '../../../dist/static/apps'), {
  prefix: '/static/apps',
  buffer: isProduction,
  dynamic: !isProduction,
  maxAge: isProduction ? 60 * 60 * 24 * 7 : 0
}))


app.use(require('./web/router').routes())

module.exports = app
