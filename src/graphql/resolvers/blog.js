import Blog from '../../models/Blog';
import Post from '../../models/Post';
import { isAuth } from '../../functions/isAuthMiddleware';
import User from '../../models/User';

export default {
	Query: {
		blog: async (_, { _id }, context) => {
			return Blog.findById(_id);
		},
		blogByUser: async (_, { _id }, context) => {
			if (_id == null || _id == 0) return null;
			return Blog.find({ author: _id });
		},
		recentBlogPosts: async (_, { _id, amount }, context) => {
			const blog = await Blog.findById(_id);
			if (!blog) {
				return [];
			}

			const postsRequested = blog.posts.slice(blog.posts.length - amount, blog.posts.length + 1);
			const res = await Promise.all(
				postsRequested.map(async (post) => {
					const found = await Post.findById(post._id);
					return found;
				})
			);

			console.log(res);
			return res;
		}
	},
	Blog: {
		posts: async (parent) => {
			const res = await Promise.all(
				parent.posts.map(async (post) => {
					const found = await Post.findById(post._id);
					return found;
				})
			);
			return res;
		},
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
		createBlog: async (_, { name }, context) => {
			try {
				const payload = isAuth(context);
				if (payload.userId === null) {
					return { success: false, post: null, message: 'You must be logged in to create a blog!' };
				}

				const newBlog = await Blog.create({ name, author: payload.userId });

				if (!newBlog) {
					return { success: false, post: null, message: 'Something went wrong, please try again!' };
				}

				const user = await User.findOne({ _id: payload.userId });

				user.blogs.push(newBlog._id);

				await user.save();

				return { success: true, _id: newBlog._id };
			} catch (err) {
				console.log(err);
				return { success: false, post: null, message: 'You must be logged in to create a blog!' };
			}
		}
	}
};
