/**
 * Created by toonew on 2017/9/20.
 */
const router = require('koa-router')();

const testRedis = require('../db/redis').testRedis;
const devRedis = require('../db/redis').devRedis;

router.get('/', function* () {
  let position = this.query.position;
  let doc;
  if (position === 'testing') {
    doc = yield testRedis.hgetallAsync('niuer_channel');
  } else {
    doc = yield testRedis.hgetallAsync('niuer_channel');
  }

  yield this.body = doc;
});

router.get('/fields', function* () {
  let key = this.query.key;

  let keys = yield testRedis.hkeysAsync(key);
  keys = keys.sort();
  yield this.body = keys;
});

router.post('/getValueByKeyAndFie', function* () {
  let body = this.request.body;
  let str = yield testRedis.hgetAsync(body.key, body.field);

  yield this.body = {result: 1, data: str};
});

router.get('/saveLocal', function* () {
  var doc = yield testRedis.hgetallAsync('niuer_open_app');
  var doc2 = yield testRedis.hgetallAsync('niuer_channel');

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
