import { User, users } from '../models/user.model';
import { genToken } from '../helpers/token.helper';
import { Database } from '../database/database';

const db = new Database();
//Create user account

export const signup = async (req, res) => {
	const user = new User(users.length + 1,req.body.email, req.body.first_name, req.body.last_name, req.body.password, req.body.address, req.body.bio, req.body.occupation, req.body.expertise);
	// users.push(user);
	await db.addUser(user);
	const token = genToken(user.email);
	return res.status(201).send({
		'status': 201,
		'message': 'User created successfully',
		'data': {
			'id': user.id,
			'token': token,
			'message': 'User created successfully',
		}
	});
};

//Login a user
export const signin = (req, res) => {
	const token = genToken(req.body.email);
	return res.status(200).send({
		'status': 200,
		'message': 'User is successfully logged in',
		'data': {
			'token': token,
		}
	});
};
//Change a user to a mentor.

export const updateMentor = (req, res) => {

	const index = users.findIndex(u => u.id == req.params.userId);

	if (index > -1) {
		users[index].role = 'Mentor';

		return res.status(200).send({
			status: 200,
			message: 'User account changed to mentor'
		});
	}

	return res.status(401).send({
		status:401,
		error: 'Invalid user id'
	});
};

//Get all mentors

export const mentors = (req, res) => {

	const mentors = users.filter(u => u.role == 'Mentor');

	return res.status(200).send({
		'status': 200,
		'data': mentors
	});
};

//Get a specific mentor by it's id
export const getMentorId = (req, res) => {
	const user = users.find(u => u.id  == req.params.userId);
	if (user) {
		return res.status(200).send({
			'status': 200,
			'data': user
		});
	}
	return res.status(404).send({
		status: 404,
		message: 'No record found'
	});
};
