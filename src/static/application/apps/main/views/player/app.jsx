import React, { Component } from 'react'
import op from 'object-path'

import { View, Main } from '../../components/layout'
import Icon from '../../components/icon'

import socket from '../../io'

import styles from './style.pcss'

class App extends Component {
  constructor (props) {
    super(props)

    this.state = {
      songs: []
    }
  }

  componentWillMount () {
    this.handleGetPlaylist = (playlist) => {
      let { songs } = playlist
      this.setState({
        songs,
      })
    }

    socket.on('api:playlist', this.handleGetPlaylist)
    this.getPlaylist()
  }

  componentWillUnmount () {
    socket.off('api:playlist', this.handleGetPlaylist)
  }

  getPlaylist () {
    socket.emit('api:playlist')
  }

  render () {
    let { songs } = this.state
    return (
      <View>
        <Main className={styles.main}>
          <article className={styles.header}>
            <div className={styles.title}>
              {op.get(songs, '0.name')}
            </div>
            <div className={styles.artists}>
              {(op.get(songs, '0.artists') || []).map((artist) => artist.name).join(', ')}
            </div>
          </article>
          <article className={styles.disc}>
            <div className={styles.cover}>
              <img src={op.get(songs, '0.album.cover')} />
            </div>
            <div className={styles.status}>
              <Icon type="pause" />
            </div>
          </article>
          <article className={styles.control}>
            <div className={styles.button} onClick={() => window.location.href = '#/playlist'}>
              <Icon type="list" />
            </div>
          </article>
        </Main>
      </View>
    )
  }
}

export default App

