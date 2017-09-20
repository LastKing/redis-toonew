const router = require('koa-router')();

router.get('/', function* (next) {
  this.body = 'this is a users response!';
});

router.get('/bar', function* (next) {
  this.body = 'this is a users/bar response!';
});

module.exports = router;
