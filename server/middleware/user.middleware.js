/* eslint-disable require-atomic-updates */
import { users } from '../models/user.model';
import bcrypt from 'bcrypt';

import { Database } from '../database/database';

const db = new Database();
// this function check if email of user is exist arleady into the system

export const isEmailUsed = async (req, res, next) => {
	//const user = users.find(user => user.email == req.body.email);

	const result = await db.selectCount('users', 'email', req.body.email);
	console.log(result);

	if (result.rows[0].count !== '0') {
		return res.status(409).send({
			'status': 409,
			'message': 'Email already exist',
			'data': req.body.email
		});
	}
	next();
};

// this function helps in hashing

export const hashPassword = async (req, res, next) => {
	const salt = await bcrypt.genSalt(10);
	const hashPassword = await bcrypt.hash(req.body.password, salt);
	// eslint-disable-next-line require-atomic-updates
	req.body.password = hashPassword;
	next();
};

export const authanticate = async (req, res, next) => {
	const user = users.find(user => user.email == req.body.email);
	console.log(users);
	if (user) {
		const validPassword = await bcrypt.compare(req.body.password, user.password);
		console.log(validPassword);
		if (validPassword) {
			req.body.userId = user.userId;
		}
		else {
			return res.status(404).send({
				'status': 404,
				'message': 'Password is not match, please try again.'
			});
		}
		next();
	} else {
		return res.status(404).send({
			'status': 404,
			'message': 'Email is not match, please try again.'
		});
	}
};


/// this function  is checking if is admi entered into the system
export const isAdmin = (req, res, next) => {
	if (req.user.role == 'Admin') {
		next();
	} else {
		return res.status(403).send({
			'status': 403,
			'error': 'You are not Admin.'
		});
	}
};
