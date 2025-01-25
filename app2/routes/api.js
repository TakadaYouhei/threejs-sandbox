var express = require('express');
var router = express.Router();


/* POST ユーザー登録. */
router.post('/regist_user', function(req, res, next) {
  // パラメータを受け取る
  var name = req.body.name;
  console.log('name: ' + name);
  res.redirect('/users/regist');
});

module.exports = router;