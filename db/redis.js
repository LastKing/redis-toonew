/**
 * redis 各个端口挂钩服务
 * Created by toonew on 2017/9/20.
 */
const bluebird = require('bluebird');
const config = require('config');
const redis = require("redis");
const ioredis = require('ioredis');

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

const devClient = redis.createClient({
  host: config.get('dev_redis_host'),
  port: config.get('dev_redis_port')
});

const testClient = redis.createClient({
  host: config.get('test_redis_host'),
  port: config.get('test_redis_port')
});

// const onlineClient = redis.createClient(config.get('online_redis_port'), config.get('online_redis_host'));


devClient.on("error", function (err) {
  console.log("error " + err);
});

testClient.on("error", function (err) {
  console.log("error " + err);
});

module.exports = {
  testRedis: testClient,
  devRedis: devClient,
  // onlineRedis: onlineClient,
};