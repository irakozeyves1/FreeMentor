import { User } from '../models/user.model';
import { genToken } from '../helpers/token.helper';

import Database  from '../db/db';



//Create user account

export const signup = async (req, res) => {
	const user = new User(req.body.email, req.body.firstname, req.body.lastname, req.body.password, req.body.address, req.body.bio, req.body.occupation, req.body.expertise,req.body.role);
	// users.push(user);
	await Database.addUser(user);
	const token = genToken(user.email);
	return res.status(201).send({
		'status': 201,
		'message': 'User created successfully',
		'data': {
			'id': user.id,
			'token': token
		
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

export const updateMentor = async (req, res) => {

	//const index = users.findIndex(u => u.id == req.params.userId);
	const index = await Database.updateUser(req.params.userId,'Mentor');
	if(index.rowCount == 1)  {
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

export const mentors = async (req, res) => {

	//const mentors = users.filter(u => u.role == 'Mentor');
	const mentors = await Database.selectBy('users', 'role','Mentor');
	const result = mentors.rows.map( m => {
		return {
			firstname: m.firstname,
			lastname: m.lastname,
			email: m.email,
			address: m.address,
			bio: m.bio,
			occupation: m.occupation,
			expertise: m.expertise,
			role: m.role
		};

	});
	return res.status(200).send({
		'status': 200,
		'data': result
	});
};

//Get a specific mentor by it's id
export const getMentorId = async (req, res) => {
	//const user = users.find(u => u.id  == req.params.userId);
	const user = await Database.selectBy('users','userid', req.params.userId);
	if (user.rows[0]) {
		const u = user.rows.map( m => {
			return {
				firstname: m.firstname,
				lastname: m.lastname,
				email: m.email,
				address: m.address,
				bio: m.bio,
				occupation: m.occupation,
				expertise: m.expertise,
				role: m.role
			};
		});

		return res.status(200).send({
			'status': 200,
			'data': u[0]
		});
	}
	return res.status(404).send({
		status: 404,
		message: 'No record found'
	});
};


