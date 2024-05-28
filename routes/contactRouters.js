var express = require('express');
var router = express.Router();

const identityContorller = require('../controller/identityController');


/* GET home page. */
router.post('/identity', identityContorller.postIdentity);

router.get('/', function (req, res, next) {
  res.send('ok');
});

module.exports = router;
