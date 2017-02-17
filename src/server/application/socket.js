import store from './store'
import SongsService from './services/songs'

const log = console.log.bind(console)

export default function (io) {
  io.on('connection', function (socket) {
    log('[socket.io %s] connected', socket.id)

    socket.emit('api:playlist', store.get('playlist'))

    socket.on('api:search', function (keyword) {
      SongsService.search(keyword)
        .then((result) => socket.emit('api:search', result))
        .catch((err) => socket.emit('error', err))
    })

    socket.on('disconnect', function () {
      log('[socket.io %s] disconnected.', socket.id)
    })
  })
}
