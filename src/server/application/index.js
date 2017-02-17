import mount from 'koa-mount'
import server from './server'
import socket from './socket'

module.exports = function (app, io) {
  app.use(mount('/', server))

  socket(io)
}
