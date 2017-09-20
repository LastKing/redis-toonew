/**
 * Created by toonew on 2017/9/20.
 */
const bluebird = require('bluebird');
const config = require('config');
const redis = require("redis");
const ioredis = require('ioredis');

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

const testClient = redis.createClient(config.get('test_redis_port'), config.get('test_redis_host'));
const devClient = redis.createClient(config.get('dev_redis_port'), config.get('dev_redis_host'));

testClient.on("error", function (err) {
  console.log("Error " + err);
});

module.exports = {
  testRedis: testClient,
  devRedis: devClient
};