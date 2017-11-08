/**
 * Created by toonew on 2017/9/20.
 */
const router = require('koa-router')();

const devRedis = require('../db/redis').devRedis;
const testRedis = require('../db/redis').testRedis;
// const onlineRedis = require('../db/redis').onlineRedis;


//根据key  获取所有的field
router.get('/fields', function* () {
  let key = this.query.key;

  let keys = yield devRedis.hkeysAsync(key);
  keys = keys.sort();
  yield this.body = keys;
});


//根据key和filed 获得广告内容
router.post('/getValueByKeyAndFie', function* () {
  let body = this.request.body;
  let str = yield devRedis.hgetAsync(body.key, body.field);

  yield this.body = {result: 1, data: str};
});


router.get('/getValueByKeyAndFieGroupByNum', function* () {
  let key = this.query.key;
  let type = this.query.type;

  let result = yield devRedis.hscanAsync('niuer_channel', 0);

  this.body = result;
});

//获取keys值长度
router.get('/hkeyLength', function* () {
  let type = this.query.type;
  let key = this.query.key;

  let doc = '';
  if (type === 'test') {
    doc = yield testRedis.hlenAsync(key);
  } else {
    doc = yield devRedis.hlenAsync(key);
  }

  this.body = doc;
});


//保存线上的数据到本地
router.get('/saveToLocal', function* () {
  let type = this.query.type;
  let key = this.query.key;

  let doc;
  if (type === 'test') {
    doc = yield testRedis.hgetallAsync(key);
  }

  // if (type === 'online') {
  //   doc = yield onlineRedis.hgetallAsync('niuer_open_app');
  //   doc2 = yield onlineRedis.hgetallAsync('niuer_channel');
  // }

  yield setAll(devRedis, key, doc);

  function* setAll(client, key, doc) {
    try {
      for (let key2 in doc) {
        yield client.hsetAsync(key, key2, doc[key2])
      }
    } catch (err) {
      console.error(err);
    }
  }

  yield this.body = {result: 1, status: 'success'};
});


module.exports = router;