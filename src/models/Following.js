import mongoose from 'mongoose';

const Following = new mongoose.Schema({
	userId: {
		required: true,
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},
	following: {
		required: false,
		default: [],
		type: [ mongoose.Schema.Types.ObjectId ],
		ref: 'Blog'
	}
});

export default mongoose.model('following', Following);
