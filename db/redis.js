/**
 * redis 各个端口挂钩服务
 * Created by toonew on 2017/9/20.
 */
const bluebird = require('bluebird');
const config = require('config');
const superagent = require('superagent');
const redis = require("redis");
const ioredis = require('ioredis');

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

const devClient = new ioredis({
  host: config.get('dev_redis_host'),
  port: config.get('dev_redis_port')
});


devClient.on("error", function (err) {
  console.error(JSON.stringify(err));
});

function* devClient2(command, key, field) {
  return yield devClient[command](key, field);
}

function* testClient(command, key, field) {
  let url = `http://${config.test_redis_host}:3001/redis?`;
  url = `${url}command=${command}&key=${key}&field=${encodeURIComponent(field)}`;
  let result = yield superagent.get(url);
  return result.text;
}

function* onlineClient(command, key, field) {
  let url = `http://${config.online_redis_host}:3001/redis?`;
  url = `${url}command=${command}&key=${key}&field=${field}`;
  let result = yield superagent.get(url);
  return result.text;
}


module.exports = {
  testRedis: testClient,
  devRedis: devClient,
  devRedis2: devClient2,
  onlineRedis: onlineClient,
};