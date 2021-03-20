import mongoose from 'mongoose';

const postSchema = new mongoose.Schema(
	{
		content: {
			required: true,
			type: String
		},
		title: {
			required: true,
			type: String
		},
		author: {
			required: true,
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User'
		},
		approved: {
			required: false,
			default: true,
			type: Boolean
		},
		comments: {
			required: false,
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Comment'
		}
	},
	{
		timestamp: true
	}
);

export default mongoose.model('Posts', postSchema);
