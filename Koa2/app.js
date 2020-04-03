const Koa = require('koa');
const body = require('koa-body')
const bodyParser = require('koa-bodyparser');
const router = require('./routes');
const response = require('./middlewares/response')
const app = new Koa();

app
  .use(response)
  .use(body())
  .use(bodyParser())
  .use(router.routes())
  .use(router.allowedMethods())
  .listen(3000)
  