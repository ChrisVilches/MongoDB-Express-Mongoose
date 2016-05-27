var mongoose = require('mongoose');

var HobbySchema = new mongoose.Schema({
	name: String,
	description: String
});

mongoose.model('Hobby', HobbySchema);