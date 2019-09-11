import { Session } from '../models/session.model';
import  Database  from '../db/db';

//Create a mentorship session request.


export const session = async  (req, res) => {
	const session = new Session(req.body.mentorId, req.user.id, req.body.questions, req.user.email);
	//sessions.push(session);

	await Database.addSession(session);
	return res.status(200).send({
		'status': 200,
		'data': session
	});
};

//A mentor can accept a mentorship session request
export const accept = async (req, res) => {

	//const accep = sessions.findIndex(a => a.id == req.params.sessionId);
	const accep = await Database.updateSession('sessions','status', 'Accept', 'sessionid', req.params.sessionId);
	if (accep.rows[0]) {
		return res.status(200).send({
			'status': 200,
			'data': accep.rows[0]
		});
	}

	return res.status(404).send({
		'status': 404,
		'error': 'No session of this specific id'
	});

	
};
//A mentor can reject a mentorship session request.

export const reject = async (req, res) => {

	//const rejec = sessions.findIndex(a => a.id == req.params.sessionId);
	const rejec = await Database.updateSession('sessions','status', 'Reject', 'sessionid', req.params.sessionId);

	if (rejec.rows[0]) {
		return res.status(200).send({
			'status': 200,
			'data':rejec.rows[0]
		});
	}
	return res.status(404).send({
		'status': 404,
		'error': 'No session of this specific id'
	});
	
};

//Get all mentorship session requests
export const getSessionById = async  (req, res) => {
	const sessions =await Database.selectAll('sessions');
	return res.status(200).send({
		status: 200,
		data :sessions.rows[0]
		
	});
};

// Admin can delete mentorship session review deemed inappropriate.
export const remove = async (req, res) => {
	//const removes = sessions.findIndex(r => r.id == req.params.sessionId);
	const removes = Database.deleteSession('sessions',req.params.sessionId);
	if(removes){
		//sessions.splice(removes, 1);
		return res.status(200).send({
			status: 200,
			data : {
				message: 'Review successfully deleted'
			}
		});
	}


};

