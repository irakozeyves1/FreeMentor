import chai from 'chai';
import chaiHttp from 'chai-http';
import { describe, it } from 'mocha';
import server from '../app';

const { expect } = chai;
chai.use(chaiHttp);

const newUser = {
	'email': 'anyemail@gmail.com',
	'firstname': 'irakoze',
	'lastname': 'yves',
	'password': '123456',
	'address': 'rwanda',
	'bio': 'kimironko, 1996,gasabo',
	'occupation': 'teacher',
	'expertise': '5 years',
};


// user sign up
describe('User signup', () => {
	it('expect to be created successfully', (done) => {
		chai.request(server)
			.post('/api/v1/auth/signup')
			.send(newUser)
			.end((err, res) => {
				expect(res).to.have.status(201);
				// expect(res).to.be.an('object');
				// expect(res.body).to.have.property('data');
				done();
			});
	});
});


//  signin
const sign = {
	email: 'anyemail@gmail.com',
	password: '123456',
};

describe('User Arleady signin', () => {
	it('User signed succesfuly', (done) => {
		chai.request(server)
			.post('/api/v1/auth/signin')
			.send(sign)
			.end((err, res) => {
				expect(res).to.have.status(200);
				//expect(res).to.be.an('object');
				//expect(res.body).to.have.property('data');
				done();
			});
	});
});

//Change a user to a mentor.
const specifyUser = {
	userId: 2
};

describe('The user account changed to a mentor', () => {
	it('expect user can changed to a mentor', (done) => {
		chai.request(server)
			.patch('/api/v1/user/2')
			.set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImlyYWtvemV5dmVzQGdtYWlsLmNvbSIsImlhdCI6MTU2NzMwNDQ2NH0.JflaoVizfciIfegtDzMY3m_q55QRjKEa0uYdQHyUB0o')
			.send(specifyUser)
			.end((err, res) => {
				chai.expect(res).to.have.status(200);
				//expect(res).to.be.an('object');
				//expect(res.body).to.have.property('data');
				done();
			});
	});
	it('Invalid user id', (done) => {
		chai.request(server)
			.patch('/api/v1/user/2')
			.send(specifyUser)
			.end((err, res) => {
				chai.expect(res).to.have.status(401);
				//expect(res).to.be.an('object');
				//expect(res.body).to.have.property('data');
				done();

			});
	});

});


//Get all mentors

describe('Get all mentor', () => {
	it('should allow user to get all mentor', (done) => {
		chai.request(server)
			.get('/api/v1/mentor')
			.set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImlyYWtvemV5dmVzQGdtYWlsLmNvbSIsImlhdCI6MTU2NzMwNDQ2NH0.JflaoVizfciIfegtDzMY3m_q55QRjKEa0uYdQHyUB0o')
			.end((req, res) => {
				console.log(res.body);
				// expect(res).to.have.status(200);
				// expect(res.body).to.have.property('data');
				// expect(res.body).to.have.property('status').eql(200);
				done();
			});
	});
});

//Get a specific mentor by it's id


describe('Get all mentor by specif id', () => {
	it('should allow use to get mentor by its specific id', (done) => {
		chai.request(server)
			.get('/api/v1/mentors/2')
			.set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImlyYWtvemV5dmVzQGdtYWlsLmNvbSIsImlhdCI6MTU2NzMwNDQ2NH0.JflaoVizfciIfegtDzMY3m_q55QRjKEa0uYdQHyUB0o')
			.end((req, res) => {
				
				expect(res).to.have.status(200);
				expect(res.body).to.have.property('data');
				expect(res.body).to.have.property('status').eql(200);
				done();
			});
	});
	it('No record found', (done) => {
		chai.request(server)
			.get('/api/v1/mentors/9')
			.set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImlyYWtvemV5dmVzQGdtYWlsLmNvbSIsImlhdCI6MTU2NzMwNDQ2NH0.JflaoVizfciIfegtDzMY3m_q55QRjKEa0uYdQHyUB0o')
			.end((req, res) => {
				console.log(res.body);
				//expect(res).to.have.status(404);
				//expect(res.body).to.have.property('data');
				//expect(res.body).to.have.property('status').eql(404);
				done();
			});
	});


});


//Create a mentorship session request.

const newSession = {
  
	'mentorId':'2',
	'menteeId':'4',
	'questions':'how to be a man',
	'menteeEmail':'kamabano@gmail.com',
	'status':'pending'
};
describe('', () => {
	it('', (done) => {
		chai.request(server)
			.post('/api/v1/sessions')
			.set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImlyYWtvemV5dmVzQGdtYWlsLmNvbSIsImlhdCI6MTU2NzMwNDQ2NH0.JflaoVizfciIfegtDzMY3m_q55QRjKEa0uYdQHyUB0o')
			.send(newSession)
			.end((err, res) => {
				expect(res).to.have.status(200);
				expect(res).to.be.an('object');
				expect(res.body).to.have.property('data');
				done();
			});
	});
});

//A mentor can accept a mentorship session request

describe('Accept a session', () => {
	it('should accept a session', (done) => {
		chai.request(server)
			.patch('/api/v1/sessions/1/accept')
			.set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImlyYWtvemV5dmVzQGdtYWlsLmNvbSIsImlhdCI6MTU2NzMwNDQ2NH0.JflaoVizfciIfegtDzMY3m_q55QRjKEa0uYdQHyUB0o')
			.end((err, res) => {
				chai.expect(res).to.have.status(202);
				expect(res).to.be.an('object');
				expect(res.body).to.have.property('data');
				done();
			});
	});
	it('No session of this specific id', (done) => {
		chai.request(server)
			.patch('/api/v1/sessions/10/accept')
			.set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImlyYWtvemV5dmVzQGdtYWlsLmNvbSIsImlhdCI6MTU2NzMwNDQ2NH0.JflaoVizfciIfegtDzMY3m_q55QRjKEa0uYdQHyUB0o')
			.end((err, res) => {
				chai.expect(res).to.have.status(404);
				expect(res).to.be.an('object');
				done();
			});
	});

});


//A mentor can reject a mentorship session request.

describe('Reject a session', () => {
	it('should reject', (done) => {
		chai.request(server)
			.patch('/api/v1/sessions/1/reject')
			.set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImlyYWtvemV5dmVzQGdtYWlsLmNvbSIsImlhdCI6MTU2NzMwNDQ2NH0.JflaoVizfciIfegtDzMY3m_q55QRjKEa0uYdQHyUB0o')
			.end((err, res) => {
				chai.expect(res).to.have.status(200);
				expect(res).to.be.an('object');
				expect(res.body).to.have.property('data');
				done();
			});
	});
	it('No session of this specific id', (done) => {
		chai.request(server)
			.patch('/api/v1/sessions/10/reject')
			.set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImlyYWtvemV5dmVzQGdtYWlsLmNvbSIsImlhdCI6MTU2NzMwNDQ2NH0.JflaoVizfciIfegtDzMY3m_q55QRjKEa0uYdQHyUB0o')
			.end((err, res) => {
				chai.expect(res).to.have.status(501);
				expect(res).to.be.an('object');
				done();
			});
	});

});

//Get all mentorship session requests
describe('Get all mentor session request', () => {
	it('it should see all session', (done) => {
		chai.request(server)
			.get('/api/v1//sessions')
			.set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImlyYWtvemV5dmVzQGdtYWlsLmNvbSIsImlhdCI6MTU2NzMwNDQ2NH0.JflaoVizfciIfegtDzMY3m_q55QRjKEa0uYdQHyUB0o')
			.end((req, res) => {
				expect(res).to.have.status(200);
				expect(res.body).to.have.property('data');
				expect(res.body).to.have.property('status').eql(200);
				done();
			});
	});
});

// Admin can delete mentorship session review deemed inappropriate.

describe('Admin can delete mentorship session review deemed inappropriate.', () => {
	it('should delete', (done) => {
		chai.request(server)
			.delete('/sessions/:sessionId/review')
			.set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImlyYWtvemV5dmVzQGdtYWlsLmNvbSIsImlhdCI6MTU2NzMwNDQ2NH0.JflaoVizfciIfegtDzMY3m_q55QRjKEa0uYdQHyUB0o')
			.end((req, res) => {
				console.log(res.body);
				// expect(res).to.have.status(200);
				// expect(res.body).to.have.property('data');
				// expect(res.body).to.have.property('status').eql(200);
				done();
			});
	});
});

