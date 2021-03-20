import { User } from '../models/';
import { sign } from 'jsonwebtoken';

export const createAccessToken = (user) => {
	return sign({ userId: user.id }, process.env.SECRET, { expiresIn: '15m' });
};

export const createRefreshToken = (user) => {
	return sign({ userId: user.id, tokenVersion: user.tokenVersion }, process.env.SECRET2, { expiresIn: '7d' });
};

export const sendRefreshToken = (res, token) => {
	res.cookie('cath', token, { httpOnly: true, path: 'refresh_token' });
};
