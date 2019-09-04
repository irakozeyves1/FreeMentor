
export class User {
	constructor(userId,email, firstname, lastname, password, address, bio, occupation, expertise, role = 'user'){
		this.id =userId;
		this.email = email;
		this.firstname = firstname;
		this.lastname = lastname;
		this.password = password;
		this.address = address;
		this.bio = bio;
		this.occupation = occupation;
		this.expertise = expertise;
		this.role = role;
	}
}
// eslint-disable-next-line linebreak-style
export let users = [
	new User(1,'irakozeyves@gmail.com', 'irakoze', 'yves', '$2b$10$1BDJZ6qsLDDK1Mp.mqhWaeHyrA//mEZ5hVWf.F7r6KrRwL5J.Rqwi', 'rwanda', 'kimironko, 1996,gasabo', 'teacher', '5 years', 'Admin'),
];

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImlyYWtvemV5dmVzQGdtYWlsLmNvbSIsImlhdCI6MTU2NzMwNDQ2NH0.JflaoVizfciIfegtDzMY3m_q55QRjKEa0uYdQHyUB0o