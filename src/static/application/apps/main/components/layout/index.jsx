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
