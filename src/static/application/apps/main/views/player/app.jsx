import React, { Component } from 'react'
import cx from 'classnames'
import op from 'object-path'
import km from 'keymirror'

import { View, Main } from '../../components/layout'
import Icon from '../../components/icon'

import socket from '../../io'

import styles from './style.pcss'

export const PLAYER_STATUS = km({
  PLAYING: null,
  PAUSED: null,
  STOP: null,
})

class App extends Component {
  constructor (props) {
    super(props)

    this.state = {
      songs: [],
      player: {
        status: PLAYER_STATUS.STOP,
      },
    }
  }

  componentWillMount () {
    this.handleGetPlaylist = (playlist) => {
      let { songs } = playlist
      this.setState({
        songs,
      })
    }
    this.handleGetPlayer = (player) => {
      this.setState({
        player,
      })
    }

    socket.on('api:playlist', this.handleGetPlaylist)
    socket.on('api:player', this.handleGetPlayer)

    socket.emit('api:playlist')
    socket.emit('api:player')
  }

  componentWillUnmount () {
    socket.off('api:playlist', this.handleGetPlaylist)
    socket.off('api:player', this.handleGetPlayer)
  }

  play () {
    console.log('play')
    socket.emit('api:play')
  }

  resume () {
    console.log('resume')
    socket.emit('api:resume')
  }

  pause () {
    console.log('pause')
    socket.emit('api:pause')
  }

  next () {
    console.log('next')
    socket.emit('api:next')
  }

  render () {
    let { songs, player } = this.state
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
            <div className={cx(styles.cover, { [styles.playing]: player.status === PLAYER_STATUS.PLAYING })}>
              <img src={op.get(songs, '0.album.cover')} />
            </div>
            {
              player.status === PLAYER_STATUS.PLAYING ?
                <div className={styles.status} onClick={this.pause.bind(this)}>
                  <Icon type="circle-pause-o" />
                </div> :
                player.status === PLAYER_STATUS.PAUSED ?
                  <div className={styles.status} onClick={this.resume.bind(this)}>
                    <Icon type="circle-play-o" />
                  </div> :
                  <div className={styles.status} onClick={this.play.bind(this)}>
                    <Icon type="circle-play-o" />
                  </div>
            }
          </article>
          <article className={styles.control}>
            <div className={styles.button} onClick={() => window.location.href = '#/playlist'}>
              <Icon type="list" />
            </div>
            <div className={styles.button} onClick={this.next.bind(this)}>
              <Icon type="next" />
            </div>
          </article>
        </Main>
      </View>
    )
  }
}

export default App

