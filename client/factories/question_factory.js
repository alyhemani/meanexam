app.factory('QuestionFactory', function($http){
	var factory = {};
	
	factory.index = function(callback){
		$http.get('/questions').then(callback);
	}
	factory.create = function(newQuestion, callback){
		$http.post('/questions', newQuestion).then(callback);
	}
	factory.show = function(id, callback){
		$http.get('/questions/' + id).then(callback);
	}
	return factory;
})