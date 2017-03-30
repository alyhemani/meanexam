app.controller('QuestionsController', function(QuestionFactory, UserFactory, AnswerFactory, $routeParams, $location){
	console.log('instanciating QuestionsController....')
	var self = this;
	self.questions = [];
	self.question = {};
	self.errors = [];

	self.create = function(newQuestion){
		newQuestion.author = UserFactory.current_user.name;
		newQuestion.user_id = UserFactory.current_user._id;
		QuestionFactory.create(newQuestion, function(res){
			if(res.data.errors){
				self.errors = [];
				console.log(res)
				self.errors.push('Question must be atleast 10 characters in length');
				$location.url('/question')
			}
			if(!res.data.errors){
				self.index();
				$location.url('/dashboard')
			}
		})
	}
	self.index = function(){
		QuestionFactory.index(function(res){
			self.questions = res.data;
		})
	}
	self.show = function(){
		QuestionFactory.show($routeParams.id, function(res){
			self.question = res.data;
		})
	}
	self.createAnswer = function(newAnswer, question_id){
		newAnswer.author = UserFactory.current_user.name;
		newAnswer.user_id = UserFactory.current_user._id;
		newAnswer.question_id = question_id;
		AnswerFactory.create(newAnswer, function(res){
			self.show();
			$location.url('/dashboard');
		})
	}
	self.show_redirect = function(id){
		$location.url('/questions/' + id)
	}
	self.like = function(id){
		AnswerFactory.like(id, function(res){
			self.show();
		})
	}
	self.answer_redirect = function(id){
		$location.url('/answer/' + id)
	}
})