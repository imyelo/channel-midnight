import moment from 'moment'
import querystring from 'querystring'
import load from 'load-script'
import { loading } from '../libraries/nprogress'

export const env = window.__ENV__ = __ENV__
const qs = querystring.parse(window.location.search.slice(1))

export const ENVIRONMENT = {
  DEVELOPMENT: 'development',
  PRODUCTION: 'production',
}

export const isProduction = env.ENV === ENVIRONMENT.PRODUCTION
export const isDevelopment = env.ENV === ENVIRONMENT.DEVELOPMENT

export const isDebug = isDevelopment || ('debug' in qs)

export const __scene = qs.__scene

if (isDebug) {
  console.log(
  `-----===== ${env.PKG_NAME} =====-----

  [包名] ${env.PKG_NAME}
  [编译环境] ${env.ENV || '无'}
  [最近编译时间] ${moment(env.BUILT_AT).format('YYYY-MM-DD HH:mm:ss')}

  .....----- ${env.PKG_NAME.replace(/./g, '=')} -----.....
  `)

  // require('bundle!eruda')(loading.wrap((eruda) => eruda.init()))

  if (qs.__bs_server) {
    load(`http://${qs.__bs_server}/browser-sync/browser-sync-client.js?v=2.18.6`)
  }
}
