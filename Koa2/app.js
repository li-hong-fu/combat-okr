const Koa = require('koa');
const app = new Koa();
const bodyParser = require('koa-bodyparser')
const router = require('./routes/api')

app.use(bodyParser())
app.use(router.router())

app.listen(3000);
console.log('启动成功');
