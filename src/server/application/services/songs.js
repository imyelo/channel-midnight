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
}

export default new SongsService()
