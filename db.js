

const mongoose = require('mongoose');
const URLSlugs = require('mongoose-url-slugs');





const CommentSchema = new mongoose.Schema({
	userID: {type: String, required: true}, 
	postID: {type: String, required: true},
	comment: String, 
	createdAT: String
});


const PostSchema = new mongoose.Schema({
	userID: {type: String, required: true}, //must be logged in to post or comment
	title: {type: String, required: true},
	url: {type: String}, //optional url to outside website 
	status: {type: String, required: true},
	comments: [CommentSchema],
	createAt: String, //timestamp
});

const UserSchema = new mongoose.Schema ({
    username: {type: String, unique: true, required: true},
    email: {type: String, unique: true, required: true}, 
    password: {type: String, unique: true, required: true},
    posts: [PostSchema],
    comments: [CommentSchema]
});


PostSchema.plugin(URLSlugs('username title'));


// "registring" your schema
// name as a string mapped to actual schema object
mongoose.model('Comment', CommentSchema);
mongoose.model('Post', PostSchema);
mongoose.model('User', UserSchema);

mongoose.connect('mongodb://localhost/27017/basketball');
