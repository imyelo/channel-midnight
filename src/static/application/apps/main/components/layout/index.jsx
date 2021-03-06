import React from 'react'
import cx from 'classnames'
import styles from './style.pcss'

export const View = ({className, children, ...props}) => {
  return (
    <div className={cx(styles.view, className)} {...props}>
      {children}
    </div>
  )
}

export const Main = ({className, children, ...props}) => {
  return (
    <div className={cx(styles.main, className)} {...props}>
      {children}
    </div>
  )
}
