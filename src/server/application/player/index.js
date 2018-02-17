import events from 'events'
import km from 'keymirror'
import Speaker from 'speaker'
import lame from 'lame'
import request from 'request'

import store from '../store'

const PLAYER_STATUS = km({
  PLAYING: null,
  PAUSED: null,
  STOP: null,
})

class PlayerService extends events.EventEmitter {
  constructor () {
    super()

    this.playing = false
    this.paused = false
  }

  play (source) {
    this._file = request(source)
    this._file.on('close', () => {
      this.playing = false
      this.paused = false
      this.emit('playend')
    })
    this._file.on('error', (error) => this.emit(error))

    if (this._stream) {
      this._stream.unpipe()
      this._speaker.close()
    }

    this._stream = new lame.Decoder()
    this._stream.on('error', (error) => this.emit(error))

    this._speaker = new Speaker()
    this._speaker.on('error', (error) => this.emit(error))

    this._stream.pipe(this._speaker)
    this._stream.on('close', () => {
      this.playing = false
      this.paused = false
      this.emit('playend')
    })
    this._stream.on('error', (error) => this.emit('error', error))

    this._file.pipe(this._stream)

    this.playing = true
    this.paused = false
    this.emit('playing')
  }

  resume () {
    if (this.status() !== PLAYER_STATUS.PAUSED) {
      return
    }
    // this._speaker = new Speaker()
    this._stream.pipe(this._speaker)

    this.playing = true
    this.paused = false
    this.emit('playing')
  }

  pause () {
    if (this.status() !== PLAYER_STATUS.PLAYING) {
      return
    }
    // this._speaker.end()
    this._stream.unpipe()

    this.playing = false
    this.paused = true
    this.emit('pause')
  }

  status () {
    return this.paused ? PLAYER_STATUS.PAUSED : this.playing ? PLAYER_STATUS.PLAYING : PLAYER_STATUS.STOP
  }
}

export default new PlayerService()
