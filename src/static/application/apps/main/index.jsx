import 'normalize.css'
import 'nprogress/nprogress.css'
import { attach as fastclick } from 'fastclick'
import React from 'react'
import { render } from 'react-dom'
import './utils/prevent-overscroll/level-3'

import './utils/debug'

import router from './router.jsx'

class Root extends React.Component {
  render() {
    return router
  }
}

render(router, document.getElementById('application-container'))

fastclick(document.body)
