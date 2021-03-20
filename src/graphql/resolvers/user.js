import { hash, compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import User from '../../models/User';
import { createAccessToken, createRefreshToken, sendRefreshToken } from '../../functions/auth';
import { isAuth } from '../../functions/isAuthMiddleware';
import { verify } from 'jsonwebtoken';
export default {
	Query: {
		users: async () => {
			const users = await User.find();

			console.log(JSON.stringify(users));
			return users;
		},
		userId: async (_, {}, context) => {
			try {
				const payload = isAuth(context);

				if (payload !== null) return `your user id is: ${payload.userId}`;
			} catch (err) {
				return 'not authenticated';
			}
		},
		me: async (_, {}, context) => {
			const auth = context.req.headers['authorization'];

			if (!auth) {
				return null;
			}
			try {
				const token = auth.split(' ')[1];
				const payload = verify(token, process.env.SECRET);
				console.log('Payload: ' + payload.userId);
				return User.findOne({ _id: payload.userId });
			} catch (err) {
				console.log(err);
				return null;
			}
		}
	},
	Mutation: {
		registerUser: async (_, { user }, {}) => {
			try {
				const foundUser = await User.findOne({ email: user.email });
				if (foundUser) {
					return { success: false, message: 'This user already exists!' };
				}

				const hashedPassword = await hash(user.password, 12);

				await User.create({ email: user.email, password: hashedPassword });
				return { success: true };
			} catch (err) {
				console.log(err);
				return { success: false, message: 'Something went wrong, please try again!' };
			}
		},
		login: async (_, { user }, { res }) => {
			const foundUser = await User.findOne({ email: user.email });

			if (!foundUser) {
				throw Error('Could not find user: ' + user.email);
			}

			const valid = await compare(user.password, foundUser.password);

			if (!valid) {
				throw Error('Bad password');
			}

			// This gets sent to the user in a cookie
			sendRefreshToken(res, createRefreshToken(foundUser));

			//Succesful login
			return { accessToken: createAccessToken(foundUser), user: foundUser };
		},
		revokeUserFrefreshToken: async (_, { userId }, {}) => {
			try {
				const user = await User.findOne({ _id: userId });

				user.tokenVersion = user.tokenVersion + 1;
				await user.save();
				return true;
			} catch (err) {
				console.log(err);
				return false;
			}
		},
		logout: async (_, context, { res }) => {
			console.log('called');
			sendRefreshToken(res, '');

			return true;
		}
	}
};
