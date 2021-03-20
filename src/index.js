import 'dotenv/config';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { verify } from 'jsonwebtoken';
import User from './models/User';
import { typeDefs, resolvers } from './graphql/';
import { createAccessToken, createRefreshToken, sendRefreshToken } from './functions/auth';
import mongoose from 'mongoose';

(async () => {
	const app = express();
	mongoose.connect('mongodb://127.0.0.1:27017/', { useNewUrlParser: true });

	app.use(
		cors({
			origin: 'http://localhost:3000',
			credentials: true
		})
	);

	app.use(cookieParser());

	app.post('/refresh_token', async (req, res) => {
		const token = req.cookies.cath;

		if (!token) {
			return res.send({ ok: false, accessToken: '' });
		}

		let payload = null;
		try {
			payload = verify(token, process.env.SECRET2);
		} catch (err) {
			console.log(err);
			return res.send({ ok: false, accessToken: '' });
		}

		const user = await User.findOne({ _id: payload.userId });

		if (!user) {
			return res.send({ ok: false, accessToken: '' });
		}

		if (user.tokenVersion !== payload.tokenVersion) {
			return res.send({ ok: false, accessToken: '' });
		}

		sendRefreshToken(res, createRefreshToken(user));

		return res.send({ ok: true, accessToken: createAccessToken(user) });
	});

	const apolloServer = new ApolloServer({
		typeDefs,
		resolvers,
		context: ({ req, res }) => ({
			req,
			res
		})
	});

	apolloServer.applyMiddleware({ app, cors: false });

	app.listen(5000, () => {
		console.log('Express server started on port 5000');
	});
})();
