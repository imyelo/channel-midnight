import events from 'events'
import Player from 'player'
import km from 'keymirror'

import store from '../store'

const PLAYER_STATUS = km({
  PLAYING: null,
  PAUSED: null,
  STOP: null,
})

class PlayerService extends events.EventEmitter {
  constructor () {
    super()

    this._handlers = {
      playing: () => {
        this.playing = true
        this.emit('playing')
      },
      playend: () => {
        this.playing = false
        this.emit('playend')
      },
      error: (error) => {
        console.error(error)
      },
    }
    this.playing = false
    this.resetPlayer()
  }

  resetPlayer () {
    if (this.player) {
      this.player.stop()
      this.player.removeAllListeners()
    }

    this.player = new Player()

    this.player.on('playing', this._handlers.playing)
    this.player.on('playend', this._handlers.playend)
    this.player.on('error', this._handlers.error)
  }

  play (source) {
    this.resetPlayer()
    this.player.add(source)
    this.player.play()
  }

  resume () {
    if (this.status() !== PLAYER_STATUS.PAUSED ) {
      return
    }
    this.player.pause()
    this.playing = true
    this.emit('playing')
  }

  pause () {
    if (this.status() !== PLAYER_STATUS.PLAYING ) {
      return
    }
    this.player.pause()
    this.emit('pause')
  }

  status () {
    if (this.player.paused) {
      return PLAYER_STATUS.PAUSED
    }
    return this.playing ? PLAYER_STATUS.PLAYING : PLAYER_STATUS.STOP
  }

}

export default new PlayerService()
