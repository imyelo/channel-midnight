import React, { Component } from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import DocumentTitle from 'react-document-title'

import { DEFAULT_TITLE } from './constants'

import Icon from './components/icon'

import transition from './transition.pcss'
import styles from './application.pcss'

class Application extends Component {
  render() {
    const { location: { pathname }, children } = this.props
    const key = pathname || 'root'
    return (<DocumentTitle title={DEFAULT_TITLE}>
      <div className={styles.application}>
        <ReactCSSTransitionGroup
          transitionName={transition}
          transitionAppear={true}
          transitionAppearTimeout={600}
          transitionEnterTimeout={400}
          transitionLeaveTimeout={400}>
          {
            React.cloneElement(children || <div />, {key})
          }
        </ReactCSSTransitionGroup>
        <a className={styles.message} href="https://trello.com/b/HXu2z0rO/channel-midnight-todo" target="_blank"><Icon type="handup" /> 听说你有一个 idea?</a>
      </div>
    </DocumentTitle>)
  }
}

export default Application
