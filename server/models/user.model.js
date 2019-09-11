
export class User {
	constructor(email, firstname, lastname, password, address, bio, occupation, expertise, role = 'user'){
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


//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImlyYWtvemV5dmVzQGdtYWlsLmNvbSIsImlhdCI6MTU2NzkyNDczMn0.DGAdh78cVzVlYa4tJesSjC2PPmWUziq_suxoPn_FROA