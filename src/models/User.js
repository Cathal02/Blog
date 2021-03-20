import mongoose from 'mongoose';

const User = new mongoose.Schema({
	email: {
		type: String
	},
	password: {
		type: String
	},
	tokenVersion: {
		type: Number,
		default: 0
	},
	admin: {
		type: Boolean,
		default: false
	},
	blogs: {
		required: false,
		default: [],
		type: [ mongoose.Schema.Types.ObjectId ],
		ref: 'Blog'
	}
});

export default mongoose.model('User', User, 'User');
