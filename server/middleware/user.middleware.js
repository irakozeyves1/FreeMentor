/* eslint-disable require-atomic-updates */
import { users } from '../models/user.model';
import bcrypt from 'bcrypt';

// this function check if email of user is exist arleady into the system

export const isEmailUsed = (req, res, next) => {
	const user = users.find(user => user.email == req.body.email);
	if (user) {
		return res.status(401).send({
			'status': 401,
			'message': 'Email already exist',
			'data': user.email
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
			'message': 'You are not Admin.'
		});
	}
};
