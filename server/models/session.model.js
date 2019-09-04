

export class Session {
	constructor(sessionId,mentorId, menteeId, questions, menteeEmail, status = 'pending') {
		this.id = sessionId;
		this.mentorId = mentorId;
		this.menteeId = menteeId;
		this.questions = questions;
		this.menteeEmail = menteeEmail;
		this.status = status;
	}
}


export let sessions = [];

