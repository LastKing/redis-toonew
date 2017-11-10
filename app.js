const app = require('koa')();
const logger = require('koa-logger');
const json = require('koa-json');
const views = require('koa-views');
const onerror = require('koa-onerror');
const router = require("koa-router")();
const mount = require('koa-mount');

const moment = require('moment');

const index = require('./routes/index');
const users = require('./routes/users');
const redis = require('./routes/redis');

// error handler
onerror(app);

// global middlewares
app.use(views('views', {
  root: __dirname + '/views',
  default: 'ejs'
}));
app.use(require('koa-bodyparser')());
app.use(json());
app.use(logger());

app.use(function* (next) {
  let start = new Date();
  yield next;
  let ms = new Date - start;
  if (!this.path.match('node_modules'))
    console.log('%s %s %s - %s', moment(start).format("YYYY-MM-DD HH:MM:SS"), this.method, this.url, ms);
});

app.use(require('koa-static')(__dirname + '/public'));
app.use(mount('/admin', require('koa-static')(__dirname + '/admin')));
app.use(mount('/node_modules', require('koa-static')(__dirname + '/node_modules')));

// routes definition
router.use('/', index.routes(), index.allowedMethods());
router.use('/users', users.routes(), users.allowedMethods());
router.use('/redis', redis.routes(), redis.allowedMethods());

// mount root routes
app.use(router.routes());

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

/* 捕获未知结束任务 */
process.on('uncaughtException', function (err) {
  console.log(err);
});

module.exports = app;
