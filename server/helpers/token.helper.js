/* eslint-disable no-undef */
import jwt from 'jsonwebtoken';

export function genToken(email) {
	return jwt.sign({ email: email }, process.env.KEY);
}
