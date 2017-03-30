var Users = require('../controllers/users');
var Questions = require('../controllers/questions');
var Answers = require('../controllers/answers');

module.exports = function(app){
	app.get('/users', Users.index);
	app.post('/users', Users.create);
	app.get('/session', Users.session);
	app.post('/session', Users.login);
	app.get('/questions', Questions.index);
	app.post('/questions', Questions.create);
	app.get('/questions/:id', Questions.show);
	app.get('/answers', Answers.index);
	app.post('/answers', Answers.create);
	app.put('/answers/:id/like', Answers.like);
}