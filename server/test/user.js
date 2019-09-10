import chai from 'chai';
import chaiHttp from 'chai-http';
import { describe, it } from 'mocha';
import server from '../app';

const { expect } = chai;
chai.use(chaiHttp);

describe('Welcome message', () => {
	it('user should see welcome message', (done) => {
		chai.request(server)
			.get('/')
			.end((err, res) => {
				expect (res).to.have.status(200);
				expect(res).to.be.an('object');
				expect (res.body).to.have.property('status', 200);
				done();
			});
	});
});

// test app for routes that do not exist
describe('Routes do not exist', () => {
	it('Should get message of URL not found', (done) => {
		chai.request(server)
			.get('/tukykui')
			.end((err, res) => {
				expect (res).to.have.status(404);
				expect(res).to.be.an('object');
				expect (res.body).to.have.property('status', 404);
				done();
			});
	});
});




const newUser = {
	'email': 'anymail@gmail.com',
	'firstname': 'irakoze',
	'lastname': 'yves',
	'password': '123456',
	'address': 'rwanda',
	'bio': 'kimironko 1996 gasabo',
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
				expect(res).to.be.an('object');
				expect(res.body).to.have.property('data');
				done();
			});
	});
});

//  signin
const sign = {
	email: 'anymail@gmail.com',
	password: '123456',
};

describe('User signin', () => {
	it('User LoggedIn succesfuly', (done) => {
		chai.request(server)
			.post('/api/v1/auth/signin')
			.send(sign)
			.end((err, res) => {
				expect(res).to.have.status(200);
				expect(res).to.be.an('object');
				expect(res.body).to.have.property('data');
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
				expect(res).to.be.an('object');
				done();
			});
	});
	it('Invalid user id', (done) => {
		chai.request(server)
			.patch('/api/v1/user/2')
			.send(specifyUser)
			.end((err, res) => {
				chai.expect(res).to.have.status(401);
				expect(res).to.be.an('object');
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

//get a specific Mentor by it's ID
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










