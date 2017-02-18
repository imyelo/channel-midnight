import React, { Component } from 'react'

import { View, Main } from '../../components/layout'

import styles from './style.pcss'

class App extends Component {
  handleSubmit (e) {
    let keyword = this.refs.keyword.value
    window.location.href = `#/search/result?keyword=${keyword}`
  }

  render () {
    return (
      <View>
        <Main className={styles.main}>
          <form className={styles.bar} onSubmit={this.handleSubmit.bind(this)}>
            <input type="text" placeholder="请输入歌曲关键字" ref="keyword" />
          </form>
        </Main>
      </View>
    )
  }
}

export default App
