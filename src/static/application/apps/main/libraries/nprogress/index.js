import _ from 'underscore'
import NProgress from 'nprogress'
import Bluebird from 'bluebird'
import './theme.css'

let stack = 0

function start () {
  ++stack
  NProgress.start()
}

function done () {
  if (--stack <= 0) {
    stack = 0
    NProgress.done()
  }
}

let inc = NProgress.inc

export function loading () {
  let once = 1
  start()
  return () => {
    if (once === 1) {
      once = null
      done()
    }
  }
}

loading.wrap = function (callback) {
  let loaded = loading()
  return _.bind(function loadedAndCallback () {
    loaded()
    return callback.apply(this, arguments)
  }, this)
}

loading.use = function () {
  return Bluebird.resolve(loading()).disposer((loaded) => loaded())
}
