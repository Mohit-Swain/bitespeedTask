var express = require('express');
var router = express.Router();

const identityContorller = require('../controller/identityController');


/* GET home page. */
router.post('/identity', identityContorller.postIdentity);

router.get('/identity', identityContorller.getIdentity);

router.delete('/identity', identityContorller.deleteIdentity);

router.get('/', function (req, res, next) {
  res.send('You can GET, POST and delete on \'/identity\' endpoint ');
});

module.exports = router;
