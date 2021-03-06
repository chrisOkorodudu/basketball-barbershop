

const mongoose = require('mongoose');
const URLSlugs = require('mongoose-url-slugs');





const CommentSchema = new mongoose.Schema({
	userID: {type: String, required: true},
	postID: {type: String, required: true},
	comment: {type: String, required: true},
	createdAT: String
});


const PostSchema = new mongoose.Schema({
	username: {type: String, required: true}, //must be logged in to post or comment
	status: {type: String, required: true},
	url: {type: String}, //optional url to outside website
	description: {type: String, required: true},
	comments: [CommentSchema],
	createAt: String, //timestamp
});

const UserSchema = new mongoose.Schema ({
    username: {type: String, unique: true, required: true},
    email: {type: String, unique: true, required: true},
    password: {type: String, required: true},
});


PostSchema.plugin(URLSlugs('username status'));


// "registring" your schema
// name as a string mapped to actual schema object
mongoose.model('Comment', CommentSchema);
mongoose.model('Post', PostSchema);
mongoose.model('User', UserSchema);

mongoose.connect('mongodb://chroko14:qwqw1212@ds139342.mlab.com:39342/final');
