import Router from 'koa-router'
import controller from './controller'

const router = Router()

router.get('/', controller.app)

module.exports = router
