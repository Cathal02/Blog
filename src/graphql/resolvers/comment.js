import Comment from '../../models/Comment';
import { isAuth, isAdmin } from '../../functions/isAuthMiddleware';
import User from '../../models/User';
export default {
	Query: {
		comments: async (_, { postId }) => {
			return await Comment.find({ postId });
		}
	},
	Comment: {
		author: async (parent) => {
			try {
				const user = await User.findOne({ _id: parent.author });
				if (!user) {
					return null;
				}

				return { name: user.email, _id: user._id };
			} catch (err) {
				console.log(err);
				return null;
			}
		}
	},
	Mutation: {
		createComment: async (_, { comment }, context) => {
			try {
				const payload = await isAuth(context);
				if (payload.userId === null) {
					return { success: false, message: 'You must be logged in to comment!' };
				}

				comment.author = payload.userId;

				const createdComment = await Comment.create(comment);

				if (createdComment) {
					return { success: true, message: 'Comment created!', comment: createdComment };
				} else {
					return { success: false, message: 'An error occured, please try again later!!' };
				}
			} catch (error) {
				return { success: false, message: 'You must be logged in to create a comment.' };
			}
		},
		editComment: async (_, { commentId, updatedContent }, context) => {
			try {
				const payload = await isAuth(context);
				if (payload.userId === null) {
					return { success: false, message: 'You must be logged in to comment!' };
				}

				const foundComment = await Comment.findOne({ _id: commentId });

				if (!foundComment) {
					return { success: false, messsage: 'Could not find this comment' };
				}

				if (foundComment.author._id !== payload.userId) {
					const isAllowedToEdit = await isAdmin(context);
					if (!isAllowedToEdit) {
						return { success: false, message: 'Only the owner of a post can update it.' };
					}
				}

				try {
					const updatedComment = await Comment.findByIdAndUpdate(commentId, { content: updatedContent });

					return { success: true, message: 'Comment updated!', comment: updatedComment };
				} catch (err) {
					return { success: false, message: 'An error occured, please try again later!!' };
				}
			} catch (error) {
				console.log(error);
				return { success: false, message: 'You must be logged in to create a comment.' };
			}
		}
	}
};
