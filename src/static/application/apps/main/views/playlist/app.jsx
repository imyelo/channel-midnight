import React, { Component } from 'react'

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
          <article className={styles.menu}>
            <div className={styles.button} onClick={() => window.location.href = '#/'}>
              <Icon type="disc" />
            </div>
            <div className={styles.button} onClick={() => window.location.href = '#/search'}>
              <Icon type="search" />
            </div>
          </article>
          <article className={styles.playlist}>
            {
              songs.map((song) => {
                return (
                  <div className={styles.song} key={`${song.vendor}:${song.id}`}>
                    <div className={styles.thumbnail}>
                      <img src={song.album.coverSmall} />
                      <Icon type={song.vendor} className={styles.vendor} />
                    </div>
                    <div className={styles.content}>
                      <div className={styles.title}>{song.name}</div>
                      <div className={styles.author}>{song.artists.map((artist) => artist.name).join(', ')}</div>
                    </div>
                    <div className={styles.actions} onClick={() => this.add(song)}>
                      <Icon type="top" />
                    </div>
                  </div>
                )
              })
            }
          </article>
        </Main>
      </View>
    )
  }
}

export default App
