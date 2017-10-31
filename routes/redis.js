/**
 * Created by toonew on 2017/9/20.
 */
const router = require('koa-router')();

const devRedis = require('../db/redis').devRedis;
const testRedis = require('../db/redis').testRedis;
// const onlineRedis = require('../db/redis').onlineRedis;

router.get('/', function* () {
  let position = this.query.position;
  let doc;
  if (position === 'testing') {
    doc = yield testRedis.hgetallAsync('niuer_channel');
  } else {
    doc = yield devRedis.hgetallAsync('niuer_channel');
  }

  yield this.body = doc;
});

router.get('/fields', function* () {
  let key = this.query.key;

  let keys = yield devRedis.hkeysAsync(key);
  keys = keys.sort();
  yield this.body = keys;
});

router.post('/getValueByKeyAndFie', function* () {
  let body = this.request.body;
  let str = yield devRedis.hgetAsync(body.key, body.field);

  yield this.body = {result: 1, data: str};
});

router.get('/saveLocal', function* () {
  let type = this.query.type;

  let doc;
  let doc2;
  if (type === 'test') {
    doc = yield testRedis.hgetallAsync('niuer_open_app');
    doc2 = yield testRedis.hgetallAsync('niuer_channel');
  }

  // if (type === 'online') {
  //   doc = yield onlineRedis.hgetallAsync('niuer_open_app');
  //   doc2 = yield onlineRedis.hgetallAsync('niuer_channel');
  // }

  yield setAll(devRedis, 'niuer_open_app', doc);
  yield setAll(devRedis, 'niuer_channel', doc2);

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
