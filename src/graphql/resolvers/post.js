import Post from '../../models/Post';
import User from '../../models/User';
import Blog from '../../models/Blog';
import { isAuth, isAdmin } from '../../functions/isAuthMiddleware';

export default {
	Query: {
		posts: async (_, { approved }) => {
			if (approved == undefined) {
				return await Post.find({});
			}

			return await Post.find({ approved });
		},
		post: async (_, { postId }) => {
			return await Post.findOne({ _id: postId });
		}
	},
	Post: {
		author: async (parent) => {
			const userId = parent.author;

			if (userId == null || userId == 0) return null;
			const user = await User.findOne({ _id: userId });
			if (!user) {
				return null;
			}

			return { name: user.email, _id: userId };
		}
	},
	Mutation: {
		createPost: async (_, { post }, context) => {
			try {
				const payload = isAuth(context);
				if (payload.userId === null) {
					return { success: false, post: null, message: 'You must be logged in to create a post!' };
				}

				const blog = await Blog.findById(post.blog);

				if (!blog) {
					return { success: false, post: null, message: 'This post must belong to a blog that exists!' };
				}

				if (blog.author._id != payload.userId) {
					const authenticated = await isAdmin(context);
					if (!authenticated) {
						return { success: false, message: 'Only the post owner can add to this blog.' };
					}
				}
				post.author = payload.userId;
				delete post[blog];

				const newPost = await Post.create(post);

				blog.posts.push(newPost._id);

				await blog.save();

				console.log(blog);

				if (!newPost) {
					return { success: false, post: null, message: 'Something went wrong, please try again!' };
				}

				return { success: true, post: newPost };
			} catch (err) {
				console.log(err);
				return { success: false, post: null, message: 'You must be logged in to create a post!' };
			}
		},
		changeApprovalStatus: async (_, { postId, approved }, context) => {
			try {
				const authenticated = await isAdmin(context);
				if (!authenticated) {
					return { success: false, approved, message: 'You must be an admin to perform this action.' };
				}

				const newPost = await Post.updateOne({ _id: postId }, { $set: { approved } });
				return { success: true, approved, post: newPost, message: 'Post approval status changed.', postId };
			} catch (err) {
				console.log(err);
				return { success: false, approved, message: 'You must be an admin to perform this action.' };
			}
		},
		editPost: async (_, { postId, newPost }, context) => {
			try {
				const payload = await isAuth(context);
				if (payload.userId === null) {
					return { success: false, message: 'You must be logged in to create a post!' };
				}

				const post = await Post.findOne({ _id: postId });
				if (!post) {
					return { success: false, message: 'This post could not be found. Did you delete it?' };
				}

				if (post.author._id != payload.userId) {
					const isAllowedToEdit = await isAdmin(context);
					if (!isAllowedToEdit) {
						return { success: false, message: 'Only the owner of a post can update it.' };
					}
				}
				try {
					await Post.findByIdAndUpdate(postId, { title: newPost.title, content: newPost.content });

					return { success: true, message: 'Post Updated!' };
				} catch (error) {
					console.log(error);
					return { success: false, message: 'An error ocurred please try again!' };
				}
			} catch (error) {
				return { success: false, message: 'You must be logged in to do this!' };
			}
		},
		removeAllPosts: () => {
			Post.remove({});
		}
	}
};
