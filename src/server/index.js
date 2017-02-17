import co from 'co'
import http from 'http'
import config from 'config'
import koa from 'koa'
import graceful from 'graceful'
import path from 'path'
import rt from 'koa-rt'
import logger from 'koa-logger'
import favicon from 'koa-favicon'
import statics from 'koa-static-cache'
import SocketIO from 'socket.io'

const env = process.env.NODE_ENV
const isProduction = env === 'production'
const isTest = env === 'test'

module.exports = co(function *() {
  let app = koa()
  let server = http.createServer(app.callback())
  let io = SocketIO(server)

  // start server
  ;(function () {
    let name = config.get('package.name')
    let hostname = config.get('server.host')
    let port = config.get('server.port')
    if (!isTest) {
      server.listen(port, hostname, function() {
        console.log('%s server listening on %s with port %s (pid.%s)', name, hostname, server.address().port, process.pid)
      })
    }
  })()

  // settings
  app.name = config.get('package.name')
  app.keys = config.get('server.keys')
  app.proxy = true

  // log
  app.use(rt())
  app.use(logger())

  // favicon
  app.use(favicon(path.resolve(__dirname, isProduction ? '../../build/static/vendor/favicon.ico' : '../static/application/vendor/favicon.ico')))

  // import applications
  require('./application')(app, io)

  // onerror
  app.on('error', function (err) {
    console.error('[server error]', err.stack)
  })

  return app
}).catch(function (err) {
  console.log('[global error] ', err.stack)
})
