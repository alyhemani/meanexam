var mongoose = require('mongoose');
var User = mongoose.model('User');
var Question = mongoose.model('Question');

module.exports = {
	index: function(req, res){
		Question.find({}).exec(function(err, questions){
			if(err){
				return res.json(err);
			}
			return res.json(questions);
		})
	},
	create: function(req, res){
		var question = new Question(req.body);
		question.save(function(err, question){
			if(err){
				return res.json(err);
			}
			User.findById(req.body.user_id).exec(function(err, user){
				if(err){
					return res.json(err);
				}
				user.questions.push(question._id);
				user.save(function(err, user){
					if(err){
						return res.json(err);
					}
					return res.json(question);
				})
			})
		})
	},
	show: function(req, res){
		Question.findById(req.params.id).populate('answers').exec(function(err, doc){
			if(err){
				return res.json({
					"errors": {
						"message": "Question not found"
					}
				})
			}
			if(doc){
				return res.json(doc)
			}
		})
	}
}