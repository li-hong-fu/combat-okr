const router = require('koa-router')({
  prefix: '/api'
})

const auth = require('../middlewares/auth')

const userController = require('../controllers/user.js')
const todoController = require('./../controllers/todo')
const okrController = require('./../controllers/okr')
const objectiveController = require('./../controllers/objective')
const keyresultController = require('./../controllers/keyresult')
const todoOkrController = require('./../controllers/todoKeyresult')

router.post('/login',userController.userLogin)

router.get('/todo',auth.authentication,todoController.todoShow)
router.post('/todo',auth.authentication,todoController.insert)
router.put('/todo/:id',auth.authentication,todoController.update)
router.delete('/todo/:id',auth.authentication,todoController.delete)

router.get('/okr',auth.authentication,okrController.showIndex)
router.post('/okr',auth.authentication,okrController.insert)
router.get('/okr/:id',auth.authentication,okrController.editShow)
router.put('/okr/:id',auth.authentication,okrController.edit)
router.delete('/okr/:id',auth.authentication,objectiveController.delete)
router.post('/okr/:id',auth.authentication,objectiveController.update)

router.get('/okr/item/:id',auth.authentication,okrController.showItem)

router.delete('/okr/keyresult/:id',auth.authentication,keyresultController.delete)

router.get('/okr/todo/:id/keyresult',auth.authentication,todoOkrController.show)
router.post('/okr/todo/:id/keyresult',auth.authentication,todoOkrController.insert)
router.put('/okr/todo/:id/keyresult',auth.authentication,todoOkrController.delete)

module.exports = router