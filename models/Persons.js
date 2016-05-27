var mongoose = require('mongoose');

var PersonSchema = new mongoose.Schema({
	firstName: String,
	secondName: String,
	age: {type: Number, default: 0},
	hobbies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Hobby' }]
});

mongoose.model('Person', PersonSchema);