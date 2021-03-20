import mongoose from 'mongoose';

const Blog = new mongoose.Schema(
	{
		posts: {
			required: true,
			type: [ mongoose.Schema.Types.ObjectId ],
			ref: 'Post'
		},
		name: {
			required: true,
			type: String
		},
		author: {
			required: true,
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User'
		}
	},
	{
		timestamp: true
	}
);

export default mongoose.model('Blog', Blog);
