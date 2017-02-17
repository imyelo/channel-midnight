import mount from 'koa-mount'

module.exports = function (app) {
  app.use(mount('/v1', require('./server')))
}
