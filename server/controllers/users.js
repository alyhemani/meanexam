var mongoose = require('mongoose');
var User = mongoose.model('User');
var bcrypt = require('bcryptjs');

module.exports = {
	index: function(req, res){
		User.find({}).exec(function(err, users){
			if(err){
				return res.json(err);
			}
			return res.json(users);
		})
	},
	create: function(req, res){
		var user = new User(req.body);
		user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10))
		user.save(function(err, user){
			if(err){
				return res.json(err);
			}
			req.session.user = user;
			return res.json(user);
		})
	},
	session: function(req, res){
		if(!req.session.user){
			return res.json({
				"errors": "not authorized"
			})
		}
		return res.json(req.session.user);
	},
	login: function(req, res){
		var isValid = true;
		User.findOne({username: req.body.username}).exec(function(err, user){
			if(err){
				return res.json(err);
			}
			if(!user){
				return res.json({
					"errors": "invalid credentials"
				})
			}
			if(bcrypt.compareSync(req.body.password, user.password)){
				req.session.user = user;
				return res.json(user);
			}
			return res.json({
				"errors": "invalid credentials"
			})
		})
	}
}