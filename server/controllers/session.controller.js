import { Session, sessions } from '../models/session.model';
import { reviews } from '../models/review.model';
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

	const accep = sessions.findIndex(a => a.sessionId == req.params.sessionId);

	if (accep > - 1) {
		sessions[accep].status = 'Accept';

		return res.status(202).send({
			'status': 202,
			'data': sessions[accep]
		});
	}

	return res.status(404).send({
		'status': 404,
		'message': 'No session of this specific id'
	});

	
};
//A mentor can reject a mentorship session request.

export const reject = (req, res) => {
	
	const rejec = sessions.findIndex(a => a.sessionId == req.params.sessionId);

	if (rejec > -1) {
		sessions[rejec].status = 'Reject';

		return res.status(200).send({
			'status': 200,
			'data': sessions[rejec]
		});
	}
	return res.status(501).send({
		'status': 501,//Not implemented 501 status
		'message': 'No session of this specific id'
	});
	
};



//Get all mentorship session requests
export const getSessionById = (req, res) => {
	
	return res.status(200).send({
		status: 200,
		data :sessions
		
	});
	
};


//Review a mentor after a mentorship session.
export const review = (req, res) => {
	const s = sessions.find(s => s.sessionId == req.params.sessionId);
	if (s) {
		const review = new reviews(s.sessionId, s.mentorId, req.user.userId, req.body.score, req.user.userFullName, req.body.remark);
		reviews.push(review);
		return res.status(201).send({
			'status': 201,
			'message': 'Session created successfully',
			'data':session
		});
	} else {
		return res.status(400).send({
			'status': 400,
			'message': 'Bad request'
		});
	}


};


// Admin can delete mentorship session review deemed inappropriate.
export const remove = (req, res) => {
	const removes = reviews.findIndex(r => r.sessionId == req.params.sessionId);
	if(removes > -1){
		reviews.splice(removes, 1);
		return res.status(200).send({
			status: 200,
			data : {
				message: 'Review successfully deleted'
			}
		});
	}


};

