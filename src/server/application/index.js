import mount from 'koa-mount'

module.exports = function (app) {
  app.use(mount('/', require('./server')))
}
