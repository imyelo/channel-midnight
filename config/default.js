const pkg = require('../package.json')

module.exports = Object.assign({}, { package: pkg }, {
  "server": {
    "host": "0.0.0.0",
    "port": 8082,
    "keys": ["jwe1a5vqcm35gnlx8cux7h6xciq908ou"],
    "log": {
      "path": "./log/log.log"
    }
  },
  "resource": {
    "analytics": {
      "google-analytics": {
        "id": "UA-87262312-3"
      }
    },
    "wechat": {
      "app-id": "wx851369eb8cd81027"
    },
    "cdn": {
      "static": {
        "domain": "//static.m.sodalife.in",
        "path": "/"
      }
    }
  }
})
