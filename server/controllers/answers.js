var mongoose = require('mongoose');
var User = mongoose.model('User');
var Question = mongoose.model('Question');
var Answer = mongoose.model('Answer');

module.exports = {
	index: function(req, res){
		Answer.find({}).exec(function(err, answers){
			if(err){
				return res.json(err);
			}
			return res.json(answers);
		})
	},
	like: function(req, res){
		Answer.findById(req.params.id).exec(function(err, answer){
			if(err){
				return res.json(err);
			}
			if(!answer){
				return res.json({
					"errors": "invalid answer"
				})
			}
			answer.likes++
			answer.save(function(err, answer){
				if(err){
					return res.json(err);
				}
				return res.json(answer);
			})
		})
	},
	create: function(req, res){
		var answer = new Answer(req.body);
		answer.save(function(err, answer){
			if(err){
				return res.json(err);
			}
			Question.findById(req.body.question_id).exec(function(err, question){
				if(err){
					return res.json(err);
				}
				if(!question){
					return res.json({
						"errors": "invalid question"
					})
				}
				question.answers.push(answer._id)
				question.save(function(err, question){
					if(err){
						return res.json(err);
					}
					User.findById(req.body.user_id).exec(function(err, user){
						if(err){
							return res.json(err);
						}
						user.answers.push(answer._id);
						user.save(function(err, user){
							if(err){
								return res.json(err);
							}
							return res.json(question);
						})
					})
				})
			})
		})
	}
}