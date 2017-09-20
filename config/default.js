/**
 * Created by toonew on 2017/9/20.
 */
module.exports = {

  dev_redis_host: '127.0.0.1',
  dev_redis_port: 6379,

  test_redis_cluster_config: [
    {port: 7000, host: '0.0.0.0'},
    {port: 7001, host: '0.0.0.0'},
    {port: 7002, host: '0.0.0.0'}
  ],
  expire_time: 3600,


};