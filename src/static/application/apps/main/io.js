import io from 'socket.io-client'

const socket = io()

socket.on('connect', () => {
  console.log('connected.')
})

socket.on('api:player', (player) => {
  console.log('player: ', player)
})

socket.on('api:playlist', (playlist) => {
  console.log('playlist: ', playlist)
})

socket.on('api:add', (result) => {
  console.log('add: ', result)
})


socket.on('api:search', (search) => {
  console.log('search: ', search)
})

export default socket
