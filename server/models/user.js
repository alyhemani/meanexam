var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

var UserSchema = new mongoose.Schema({
	name: {
		type: String,
		minlength: 3,
		required: true
	},
	username: {
		type: String,
		minlength: 3,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	},
	questions: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Question'
	}],
	answers: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Answer'
	}]
}, {timestamps: true})

mongoose.model('User', UserSchema);