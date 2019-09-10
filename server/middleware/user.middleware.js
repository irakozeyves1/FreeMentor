import bcrypt from 'bcrypt';
import Database  from '../db/db';



export const isEmailUsed = async (req, res, next) => {
	//const user = users.find(user => user.email == req.body.email);
	const result = await Database.selectCount('users', 'email', req.body.email);

	if (result.rows[0].count !== '0') {
		return res.status(409).send({
			'status': 409,
			'message': 'Email already exist',
			'data': req.body.email,
		});
	}
	next();
	return 0;
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
	const user = await Database.selectBy('users','email', req.body.email);
	if (user.rowCount > 0) {
		const validPassword = await bcrypt.compare(req.body.password, user.rows[0].password);
		if (validPassword) {
			next();
		}
		else {
			return res.status(401).send({
				'status': 401,
				'message': 'Password is not match, please try again.'
			});
		}
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

export const isMentor = (req, res, next) => {
	
	if (req.user.role == 'Mentor') {
		next();
	} else {
		return res.status(403).send({
			'status': 403,
			'error': 'You are not Mentor.'
		});
	}
};