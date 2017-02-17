import Router from 'koa-router'
import web from '../controller/web'

const router = Router()

router.get('/', web.app)

module.exports = router
