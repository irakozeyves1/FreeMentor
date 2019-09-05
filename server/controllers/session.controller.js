import { Session, sessions } from '../models/session.model';

//Create a mentorship session request.

export const session = (req, res) => {
	const session = new Session(sessions.length + 1, req.body.mentorId, req.user.id, req.body.questions, req.user.email);
	sessions.push(session);

	return res.status(200).send({
		'status': 200,
		'data': session
	});
};

//A mentor can accept a mentorship session request
export const accept = (req, res) => {

	const accep = sessions.findIndex(a => a.id == req.params.sessionId);

	if (accep > - 1) {
		sessions[accep].status = 'Accept';

		return res.status(200).send({
			'status': 200,
			'data': sessions[accep]
		});
	}

	return res.status(404).send({
		'status': 404,
		'error': 'No session of this specific id'
	});

	
};
//A mentor can reject a mentorship session request.

export const reject = (req, res) => {
	
	const rejec = sessions.findIndex(a => a.id == req.params.sessionId);

	if (rejec > -1) {
		sessions[rejec].status = 'Reject';

		return res.status(200).send({
			'status': 200,
			'data': sessions[rejec]
		});
	}
	return res.status(501).send({
		'status': 501,//Not implemented 501 status
		'error': 'No session of this specific id'
	});
	
};



//Get all mentorship session requests
export const getSessionById = (req, res) => {
	
	return res.status(200).send({
		status: 200,
		data :sessions
		
	});
	
};

// Admin can delete mentorship session review deemed inappropriate.
export const remove = (req, res) => {
	const removes = sessions.findIndex(r => r.id == req.params.sessionId);
	if(removes > -1){
		sessions.splice(removes, 1);
		return res.status(200).send({
			status: 200,
			data : {
				message: 'Review successfully deleted'
			}
		});
	}


};

