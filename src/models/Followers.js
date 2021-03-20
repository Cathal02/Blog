import mongoose from 'mongoose';

const Followers = new mongoose.Schema({
	blogId: {
		required: true,
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Blog'
	},
	followers: {
		required: false,
		default: [],
		type: [ mongoose.Schema.Types.ObjectId ],
		ref: 'User'
	}
});

export default mongoose.model('followers', Followers);
