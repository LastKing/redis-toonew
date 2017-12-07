/**
 * Created by Rain on 2017/11/30
 */
const co = require('co');
const redis = require('../db/redis').devRedis;

co(function* () {
  let fields = yield redis.hkeys('niuer_channel');

  fields = fields.filter(function (field) {
    if (field === '1_5_1_1_1') return false;
    if (field === '1_5_1_1_2') return false;
    if (field === '1_5_1_1_3') return false;
    if (field === '1_5_1_1_4') return false;
    if (field === '1_5_1_1_5') return false;
    if (field === '1_5_1_1_6') return false;
    if (field === '1_5_1_1_7') return false;

    if (field === '2_8_1_1_1') return false;
    if (field === '2_8_1_1_2') return false;
    if (field === '2_8_1_1_3') return false;
    if (field === '2_8_1_1_4') return false;
    if (field === '2_8_1_1_5') return false;
    if (field === '2_8_1_1_6') return false;
    if (field === '2_8_1_1_7') return false;

    return true;
  });

  yield redis.hdel('niuer_channel', ...fields);

  process.exit(0);
});
