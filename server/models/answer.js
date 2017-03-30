var mongoose = require('mongoose');

var AnswerSchema = new mongoose.Schema({
	answer: {
		type: String,
		required: true,
		minlength: 5
	},
	support: {
		type: String,
		required: false
	},
	author: {
		type: String,
		required: true
	},
	likes: {
		type: Number,
		default: 0
	}
}, {timestamps: true})

mongoose.model('Answer', AnswerSchema);