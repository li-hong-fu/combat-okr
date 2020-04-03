const router = require('koa-router')({
  prefix: '/api'
})

const userController = require('../controllers/user.js')

router.post('/login', userController.userLogin)

module.exports = router