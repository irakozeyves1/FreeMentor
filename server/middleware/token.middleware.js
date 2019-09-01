import jwt from 'jsonwebtoken';
import { users } from '../models/user.model';

export function verifyToken(req, res, next) {
	const token = req.header('token');

	if (!token) return res.status(401).send({
		'status': 401,
		'message': 'Please signin in first.'
	});
	try {
		// eslint-disable-next-line no-undef
		const verified = jwt.verify(token, process.env.KEY); // Verify provided user token if is still loged in

		const u = users.find(u => u.email == verified.email);

		req.user = {
			'token': verified,
			'email': verified.email,
			'role': u.role,
			'id': u.userId,
			'userFullName': `${u.first_name} ${u.last_name}`
		}; // Store user token and role for letter uses
		next(); // Let continue
	} catch (error) {
		res.status(400).send({
			'status': 400,
			'message': 'Invalid token!'
		});
	}
}