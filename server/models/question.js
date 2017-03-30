var mongoose = require('mongoose');

var QuestionSchema = new mongoose.Schema({
	question: {
		type: String,
		required: true,
		minlength: 5
	},
	author: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: false
	},
	answers: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Answer'
	}]
}, {timestamps: true})

mongoose.model('Question', QuestionSchema);