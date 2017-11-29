/**
 * Created by toonew on 2017/9/20.
 */
const router = require('koa-router')();

const devRedis = require('../db/redis').devRedis;
const devRedis2 = require('../db/redis').devRedis2;
const testRedis = require('../db/redis').testRedis;
const onlineRedis = require('../db/redis').onlineRedis;

//搜索 dev，test，online 三个环境下的 redis数据库中的查询
router.get('/', function* () {
  let req = this.query;

  let command = req.command;
  let key = req.key;
  let field = req.field;

  //根据不同的选择 返回不同的redis 客户端
  let redis = null;
  switch (req.type) {
    case 'test':
      redis = testRedis;
      break;
    case 'online':
      redis = onlineRedis;
      break;
    default:
      redis = devRedis2;
  }

  try {
    let result;
    if (!!key && !!field)
      result = yield redis(command, key, field);
    if (!!key && !field)
      result = yield redis(command, key);

    this.response.body = result;
  } catch (err) {
    console.error(err);
  }
});

//获取hash  中所有的field
router.get('/fields', function* () {
  let key = this.query.key;

  let keys = yield devRedis.hkeys(key);
  keys = keys.sort();
  yield this.body = keys;
});


//根据key和filed 获得广告内容
router.post('/getValueByKeyAndFie', function* () {
  let body = this.request.body;
  let str = yield devRedis.hget(body.key, body.field);

  yield this.body = {result: 1, data: str};
});


router.get('/getValueByKeyAndFieGroupByNum', function* () {
  let key = this.query.key;
  let type = this.query.type;

  let result = yield devRedis.hscan('niuer_channel', 0);

  this.body = result;
});

//获取hash中 keys长度
router.get('/hkeyLength', function* () {
  let type = this.query.type;
  let key = this.query.key;

  let doc = '';
  if (type === 'test') {
    doc = yield testRedis.hlen(key);
  } else {
    doc = yield devRedis.hlen(key);
  }

  this.body = doc;
});


//保存线上的数据到本地
router.get('/saveToLocal', function* () {
  let type = this.query.type;
  let key = this.query.key;

  let doc;
  if (type === 'test') {
    doc = yield testRedis('hgetall', key);
  }

  // if (type === 'online') {
  //   doc = yield onlineRedis.hgetall('niuer_open_app');
  //   doc2 = yield onlineRedis.hgetall('niuer_channel');
  // }

  doc = JSON.parse(doc);

  yield setAll(devRedis, key, doc);

  function* setAll(client, key, doc) {
    try {
      for (let key2 in doc) {
        yield client.hset(key, key2, doc[key2])
      }
    } catch (err) {
      console.error(err);
    }
  }

  yield this.body = {result: 1, status: 'success'};
});


module.exports = router;