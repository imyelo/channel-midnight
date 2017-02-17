import lowdb from 'lowdb'
import config from 'config'

const db = lowdb(config.get('resource.lowdb.path'))

db.defaults({
  playlist: {
    songs: []
  }
}).write()

export default db
