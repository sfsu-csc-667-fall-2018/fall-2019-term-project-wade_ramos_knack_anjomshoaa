var express = require('express');
var router = express.Router();





/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/register', function(request, response, next) {
  response.status(200).sendFile(__basedir + '/build/index.html');
});

router.get('/gametable', function(request, response, next) {
  response.status(200).sendFile(__basedir + '/build/index.html');
});

router.get('/gameslobby', function(request, response, next) {
  response.status(200).sendFile(__basedir + '/build/index.html');
});

router.get('/img', function(request, response, next) {
  response.render('index', {title: 'Images'});
});

router.get('/game-lobby', function(request, response, next) {
  response.render('index', {title: 'Game Lobby'});
});

module.exports = router;
