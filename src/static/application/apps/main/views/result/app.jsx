import _ from 'underscore'
import React, { Component} from 'react'

import { View, Main } from '../../components/layout'
import Icon from '../../components/icon'

import socket from '../../io'

import styles from './style.pcss'

class App extends Component {
  constructor (props) {
    super(props)

    this.state = {
      songs: [],
    }
  }

  componentWillMount () {
    this.handleSearch = (search) => {
      let songs = _.chain(search).mapObject((result, vendor) => {
        return {
          ...result,
          songList: result.songList.map((song) => {
            return {
              ...song,
              vendor,
            }
          }).filter((song) => !song.needPay && song.vendor === 'qq'),
        }
      }).pluck('songList').flatten().value()
      this.setState({
        songs,
      })
    }

    socket.on('api:search', this.handleSearch)
    this.search()
  }

  componentWillUnmount () {
    socket.off('api:search', this.handleSearch)
  }

  componentDidUpdate (prevProps) {
    if (prevProps.location.query.keyword !== this.props.location.query.keyword) {
      this.search()
    }
  }

  search () {
    let keyword = this.props.location.query.keyword
    if (!keyword) {
      return
    }
    socket.emit('api:search', keyword)
  }

  add (song) {
    socket.emit('api:add', song)
    window.location.href = '#/playlist'
  }

  render () {
    let { songs } = this.state
    return (
      <View>
        <Main className={styles.main}>
          <article className={styles.header}>
            <div className={styles.button} onClick={() => window.location.href = '#/playlist'}>
              <Icon type="list" />
            </div>
            <div className={styles.button}>
              { this.props.location.query.keyword }
            </div>
            <div className={styles.button} onClick={() => window.location.href = '#/search'}>
              <Icon type="search" />
            </div>
          </article>
          <article className={styles.result}>
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
                      <Icon type="add" />
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
