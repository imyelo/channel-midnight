import Api from 'music-api'

const VENDOR = {
  ALL: 'all',
  NETEASE: 'netease',
  XIAMI: 'xiami',
  QQ: 'qq',
}

class SongsService {
  search (keyword) {
    return Api.searchSong(VENDOR.ALL, {
      key: keyword,
      limit: 10,
      page: 1,
    })
  }
  getSong ({ vendor, id }) {
    console.log(vendor, id)
    return Api.getSong(vendor, { id })
  }
}

export default new SongsService()
