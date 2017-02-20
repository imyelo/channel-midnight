const pkg = require('../package.json')

module.exports = Object.assign({}, { package: pkg }, {
  "server": {
    "host": "0.0.0.0",
    "port": 8090,
    "keys": ["jwe1a5vqcm35gnlx8cux7h6xciq908ou"],
    "log": {
      "path": "./log/log.log"
    }
  },
  "resource": {
    "lowdb": {
      "path": "./data/lowdb.json"
    },
    "cdn": {
      "static": {
        "domain": "",
        "path": "/"
      }
    }
  }
})
