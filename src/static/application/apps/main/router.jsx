import React from 'react'
import { Router, Route, IndexRoute, hashHistory } from 'react-router'
import Application from './application.jsx'
import { loading } from './libraries/nprogress'

const SUFFIX = '/app.jsx'
const chunk = require.context('bundle!./views/', true, /^\.(\/[^\/]+)+\/app\.jsx$/)

function view (path) {
  return function getComponent (location, callback) {
    let loadedAndCallback = loading.wrap(callback)
    chunk(path + SUFFIX)((bundle) => {
      loadedAndCallback(null, bundle.default)
    })
  }
}

const router = (<Router history={hashHistory}>
  <Route path="/" component={ Application }>
    <IndexRoute getComponent={view('./home')} />
  </Route>
</Router>)

export default router
