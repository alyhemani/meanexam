var app = angular.module('app', ['ngRoute']);

app.config(function($routeProvider){
	$routeProvider
	.when('/', {
		templateUrl: 'partials/users_new.html',
		controller: 'UsersController as UC'
	})
	.when('/dashboard',{
		templateUrl: 'partials/questions.html',
		controller: 'UsersController as UC'
	})
	.when('/question', {
		templateUrl: 'partials/new.html',
		controller: 'UsersController as UC'
	})
	.when('/questions/:id', {
		templateUrl: 'partials/show.html',
		controller: 'UsersController as UC'
	})
	.when('/answer/:id', {
		templateUrl: 'partials/answer.html',
		controller: 'UsersController as UC'
	})
	.otherwise('/')
})