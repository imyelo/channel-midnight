import React, { Component } from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

import transition from './transition.pcss'
import styles from './application.pcss'

class Application extends Component {
  render() {
    const { location: { pathname }, children } = this.props
    const key = pathname || 'root'
    return (<div className={styles.application}>
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
    </div>)
  }
}

export default Application
