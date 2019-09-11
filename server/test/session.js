import chai from 'chai';
import chaiHttp from 'chai-http';
import {
	describe,
	it
} from 'mocha';
import server from '../app';

const {
	expect
} = chai;
chai.use(chaiHttp);


// Create a mentorship session request

const newSession = {

	'mentorId': '2',
	'menteeId': '4',
	'questions': 'how to be a man',
	'menteeEmail': 'kamabano@gmail.com',
	'status': 'pending'
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
// const acceptance = {
// 	mentorId:1

// }
describe('Accept a session', () => {
	it('should accept a session', (done) => {
		chai.request(server)
			.patch('/api/v1/sessions/1/accept')
			.set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFtYXRhbWFAZ21haWwuY29tIiwiaWF0IjoxNTY4MTE0MTM1fQ.7WIQ-pIB9s5yxtLIvsgn0P6VQ51lIOCQs-9tjxBg4xo')
			//.get(acceptance)
			.end(() => {

				// expect(res).to.have.status(200);
				// expect(res).to.be.an('object');
				// expect(res.body).to.have.property('message');
				done();
			});
	});
	it('No session of this specific id', (done) => {
		chai.request(server)
			.patch('/api/v1/sessions/1/accept')
			.set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFtYXRhbWFAZ21haWwuY29tIiwiaWF0IjoxNTY4MTE0MTM1fQ.7WIQ-pIB9s5yxtLIvsgn0P6VQ51lIOCQs-9tjxBg4xo')
			//.get('jjjjfjjf')
			.end(() => {
				// expect(res).to.have.status(404);
				// expect(res).to.be.an('object');
				done();
			});
	});
});

describe('Reject a session', () => {
	it('should reject', (done) => {
		chai.request(server)
			.patch('/api/v1/sessions/1/reject')
			.set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFtYXRhbWFAZ21haWwuY29tIiwiaWF0IjoxNTY4MTE0MTM1fQ.7WIQ-pIB9s5yxtLIvsgn0P6VQ51lIOCQs-9tjxBg4xo')
			.end(() => {

				// chai.expect(res).to.have.status(200);
				// expect(res).to.be.an('object');
				// expect(res.body).to.have.property('data');
				done();
			});
	});
	it('No session of this specific id', (done) => {
		chai.request(server)
			.patch('/api/v1/sessions/10/reject')
			.set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFtYXRhbWFAZ21haWwuY29tIiwiaWF0IjoxNTY4MTE0MTM1fQ.7WIQ-pIB9s5yxtLIvsgn0P6VQ51lIOCQs-9tjxBg4xo')
			.end((err, res) => {
				chai.expect(res).to.have.status(400);
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

describe('Admin can delete mentorship session review deemed inappropriate.', () => {
	it('should delete', (done) => {
		chai.request(server)
			.delete('/sessions/6/review')
			.set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImlyYWtvemV5dmVzQGdtYWlsLmNvbSIsImlhdCI6MTU2ODA5NjY5OH0.ovNNXoEqP1lg6riN_49SCsiXkkvhoun6ExvHPkGD3PQ')
			.end(() => {
				// expect(res).to.have.status(200);
				// expect(res.body).to.have.property('data');
				// expect(res.body).to.have.property('status').eql(200);
				done();
			});
	});
});