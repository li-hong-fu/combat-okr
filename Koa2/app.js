const Koa = require('koa');
const koaBody = require('koa-body')
const bodyParser = require('koa-bodyparser');
const router = require('./routes');
const response = require('./middlewares/response')
const app = new Koa();
const cors = require('./middlewares/cors')

app
  .use(response)
  .use(koaBody())
  .use(bodyParser())
  .use(cors.allowAll)
  .use(router.routes())
  .use(router.allowedMethods())
  .listen(3000)
  