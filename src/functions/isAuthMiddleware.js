import { verify } from 'jsonwebtoken';
import User from '../models/User';
export const isAuth = (context) => {
	// bearer f2hjfdfsdjdsf <-- format of token
	const auth = context.req.headers['authorization'];

	if (!auth) {
		throw new Error('Not authenticated');
	}
	try {
		const token = auth.split(' ')[1];
		const payload = verify(token, process.env.SECRET);
		return payload;
	} catch (err) {
		console.log(err);
		throw new Error('not authenticated');
	}
};

export const isAdmin = async (context) => {
	const payload = isAuth(context);

	const foundUser = await User.findOne({ _id: payload.userId });

	if (!foundUser) {
		throw new Error('not authenticated');
	}

	return foundUser.admin;
};
