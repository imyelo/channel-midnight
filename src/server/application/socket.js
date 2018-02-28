import player, { PLAYER_STATUS } from './player'
import store from './store'
import SongsService from './services/songs'

const log = console.log.bind(console)

export default function (io) {
  const play = function () {
    let song = store.get('playlist.songs.0').value()
    if (!song) {
      return
    }
    SongsService.getSong({ vendor: song.vendor, id: song.id })
      .then((song) => {
        player.play(song.url)
      })
      .catch((error) => {
        console.log(error)
      })
  }
  const pause = function () {
    player.pause()
  }

  const resume = function () {
    player.resume()
  }

  const next = function () {
    let songs = store.get('playlist.songs').value()
    let latest = songs[0]
    store.set('playlist.songs', [...songs.slice(1), latest]).write()
    play()
  }

  const top = function (song) {
    let songs = store.get('playlist.songs').value()
    let index = songs.findIndex((s) => s.id === song.id && s.vendor === song.vendor)
    store.set('playlist.songs', [songs[index], ...songs.slice(0, index), ...songs.slice(index + 1)]).write()
    play()
  }

  player.on('playend', next)

  io.on('connection', function (socket) {
    log('[socket.io %s] connected', socket.id)

    let emitPlayer = () => {
      socket.emit('api:player', {
        status: player.status()
      })
    }

    let emitPlaylist = () => {
      socket.emit('api:playlist', store.get('playlist').value())
    }

    let remove = (song) => {
      let songs = store.get('playlist.songs').value()
      let index = songs.findIndex((s) => s.id === song.id && s.vendor === song.vendor)
      store.set('playlist.songs', [...songs.slice(0, index), ...songs.slice(index + 1)]).write()
      emitPlaylist()
      if (index === 0) {
        play()
      }
    }

    player.on('playing', emitPlayer)
    player.on('playend', emitPlayer)
    player.on('pause', emitPlayer)

    player.on('playing', emitPlaylist)

    player.on('error', (error) => console.error(error))

    socket.on('api:playlist', emitPlaylist)

    socket.on('api:search', function (keyword) {
      SongsService.search(keyword)
        .then((result) => socket.emit('api:search', result))
        .catch((err) => socket.emit('error', err))
    })

    socket.on('api:add', function (song) {
      let songs = store.get('playlist.songs').value()
      if (player.status() === PLAYER_STATUS.PLAYING) {
        songs = [...songs.slice(0, 1), song, ...songs.slice(1)]
      } else {
        songs = [song, ...songs]
      }
      store.set('playlist.songs', songs).write()
      socket.emit('api:add', songs)
      if (songs.length === 1) {
        play()
      }
    })

    socket.on('api:play', play)
    socket.on('api:next', next)
    socket.on('api:top', top)
    socket.on('api:resume', resume)
    socket.on('api:pause', pause)
    socket.on('api:remove', remove)

    socket.on('api:player', emitPlayer)

    socket.on('disconnect', function () {
      log('[socket.io %s] disconnected.', socket.id)

      player.removeListener('playing', emitPlayer)
      player.removeListener('playend', emitPlayer)
      player.removeListener('pause', emitPlayer)

      player.removeListener('playing', emitPlaylist)
    })
  })
}
