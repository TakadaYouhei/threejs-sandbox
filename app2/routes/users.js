var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.get('/regist', function(req, res, next) {
  res.render('users_regist');
});
router.get('/list', function(req, res, next) {
  res.render('users_list', { users: [
    {name: 'user1'},
    {name: 'user2'},
    ]});
});

module.exports = router;
