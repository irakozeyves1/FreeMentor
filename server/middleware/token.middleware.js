import jwt from 'jsonwebtoken';
import Database  from '../db/db';

export const verifyToken = async (req, res, next) => {
	const token = req.header('token');

	if (!token) return res.status(401).send({
		'status': 401,
		'message': 'Please signin in first.'
	});
	try {
		// eslint-disable-next-line no-undef
		const verified = jwt.verify(token, process.env.KEY); // Verify provided user token if is still loged in

		// const u = users.find(u => u.email == verified.email);     
		const u = await Database.selectBy('users', 'email', verified.email);
		// eslint-disable-next-line require-atomic-updates
		req.user = {
			token: verified,
			email: verified.email,
			role: u.rows[0].role,
			id: u.rows[0].userid,
			userFullName: `${u.first_name} ${u.last_name}`
		}; // Store user token and role for letter uses
		next(); // Let continue
	} catch (error) {
		res.status(400).send({
			'status': 400,
			'error': 'Invalid token!'
		});
	}
};