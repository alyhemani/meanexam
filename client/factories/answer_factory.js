app.factory('AnswerFactory', function($http){
	var factory = {};

	factory.create = function(newAnswer, callback){
		$http.post('/answers', newAnswer).then(callback);
	}
	factory.index = function(callback){
		$http.get('/answers').then(callback);
	}
	factory.like = function(id, callback){
		$http.put('/answers/' + id + '/like').then(callback);
	}
	return factory;
})