import mongoose from 'mongoose';

const Comment = new mongoose.Schema(
	{
		content: {
			required: true,
			type: String
		},
		author: {
			required: true,
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User'
		},
		postId: {
			required: true,
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Post'
		}
	},
	{
		timestamps: true
	}
);

export default mongoose.model('comments', Comment);
