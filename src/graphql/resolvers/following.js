import Followers from '../../models/Followers';
import Following from '../../models/Following';
import { isAuth, isAdmin } from '../../functions/isAuthMiddleware';

export default {
	Query: {
		followers: async (_, { _id }, __) => {
			if (_id == 0) return null;

			return Followers.findOne({ blogId: _id }).populate({ path: 'followers', model: 'User' });
		},
		following: async (_, { _id }, __) => {
			if (_id == 0) return null;
			const doc = await Following.findOne({ userId: _id }).populate({ path: 'following', model: 'Blog' });

			return doc.following;
		},
		followingIds: async (_, { _id }, __) => {
			if (_id == 0) return null;
			const doc = await Following.findOne({ userId: _id });

			return doc.following;
		},
		followersCount: async (_, { _id }, __) => {
			if (_id == 0) return null;

			const followersDocument = await Followers.findOne({ blogId: _id });
			if (followersDocument == null) return 0;
			return followersDocument.followers.length;
		},
		followingCount: async (_, { _id }, __) => {
			if (_id == 0) return null;

			const followingDocument = await Following.findOne({ userId: _id });
			if (followingDocument == null) return 0;

			return followingDocument.following.length;
		}
	},

	Mutation: {
		// Cathal wants to follow Kate
		// Cathal added to kates followers list
		// Kate added to cathals follows list
		// userId: Kate
		// followerId: Cathal
		addFollower: async (_, { blogId, userId }, context) => {
			try {
				const payload = isAuth(context);
				if (payload.userId === null) {
					return { success: false, message: 'You are not allowed to perform this action.' };
				}

				if (userId != payload.userId) {
					const admin = isAdmin(context);
					if (!admin) {
						return { success: false, message: 'You are not allowed to perform this action.' };
					}
				}

				var step_1 = false;

				var followersDocument = await Followers.findOne({ blogId });
				if (followersDocument == undefined || followersDocument == null) {
					followersDocument = await Followers.create({ blogId });
				}

				if (followersDocument.followers.includes(userId)) {
					return { success: false, message: 'You already follow this blog.' };
				}

				step_1 = true;

				var followingDocument = await Following.findOne({ userId });
				if (followingDocument == null) {
					followingDocument = await Following.create({ userId });
				}

				if (followingDocument.following.includes(blogId)) {
					return { success: false, message: 'You already follow this blog.' };
				}

				if (step_1) {
					followersDocument.followers.push(userId);
					await followersDocument.save();
					followingDocument.following.push(blogId);
					await followingDocument.save();
				} else {
					return { success: true, message: 'An error occured please try again.' };
				}

				return { success: true, message: 'Follow successful.' };
			} catch (e) {
				console.log(e);
				return { success: false, message: 'You are not allowed to perform this action.' };
			}
		},

		// Cathal wants to unfollow kate
		// userId: kate
		// followerId: Cathal
		removeFollower: async (_, { blogId, userId }, context) => {
			try {
				const payload = isAuth(context);
				if (payload.userId === null) {
					return { success: false, message: 'You are not allowed to perform this action.' };
				}

				if (userId != payload.userId) {
					const admin = isAdmin(context);
					if (!admin) {
						return { success: false, message: 'You are not allowed to perform this action.' };
					}
				}

				const followersDocument = await Followers.find({ blogId });

				followersDocument.followers.remove(followerId);

				await followersDocument.save();

				const followingDocument = await Following.find({ userId });

				followingDocument.followers.remove(blogId);

				await followingDocument.save();

				return { success: true, message: 'Unfollowed blog.' };
			} catch (e) {
				return { success: false, message: 'You are not allowed to perform this action.' };
			}
		}
	}
};
