import { Pool } from 'pg';

export class Database {

	dbConnection() {
		return new Pool({
			connectionString: 'postgres://postgres:12345@localhost:5432/freementor'
		});
	}

	async selectBy(table, column, value) {
		const conn = this.dbConnection();
		const result = await conn.query(`SELECT * FROM ${table} WHERE ${column}='${value}';`);
		await conn.end();
		return result;
	}

	async selectCount(table, column, value) {
		const conn = this.dbConnection();
		const result = await conn.query(`SELECT COUNT(1) FROM ${table} WHERE ${column} = '${value}';`);
		await conn.end();
		return result;
	}

	async selectAll(table) {
		const conn = this.dbConnection();
		const result = await conn.query(`SELECT * FROM ${table};`);
		await conn.end();
		return result;
	}
	async updateSession(status,id){
		const conn = this.dbConnection();
		const  result = await conn.query(`UPDATE sessions SET status = '${status}' WHERE sessionId = ${id};`);
		await conn.end();
		return result;
	}
	async seslectCount (table, column, value){
		const conn = this.dbConnection();
		const result= await conn.query(`SELECT COUNT(1) FROM ${table} WHERE ${column} ='${value}';`);
		await conn.end();
		return result;
	}
	async addUser(data) {
		const conn = this.dbConnection();
		const result = await conn.query(`INSERT INTO users(email, firstname , lastname , password , address , bio, occupation, expertise) VALUES(
            '${data.email}',
            '${data.firstname}',
            '${data.lastname}',
            '${data.password}',
            '${data.address}',
            '${data.bio}',
            '${data.occupation}',
            '${data.expertise}'           
          ) returning *;`);

		await conn.end();
		return result;
	}
	async addSession(data) {
		const conn = this.dbConnection();
		const result = await conn.query(`INSERT INTO sessions(mentorId , menteeId, score , menteeEmail, status) VALUES (
        
        '${data.mentorId}',
        '${data.menteeId}',
        '${data.questions}',
        '${data.menteeEmail}',
        '${data.status}'
        ) returning *`);
		await conn.end();
		return result;
	}

	async addReview(data) {
		const conn = this.dbConnection();
		const result = await conn.query(`INSERT INTO review (sessionId , mentorId, menteeId, score, menteeFullname , remark) VALUES(
            '${data.sessionId}',
            '${data.mentorId}',
            '${data.score}',
            '${data.menteeFullName}',
            '${data.remark}'

        ) returning *`);
		await conn.end();
		return result;

	}
	async createDb() {
		const conn = this.dbConnection();
		await conn.query(`
		  CREATE TABLE IF NOT EXISTS users( userId SERIAL, email VARCHAR(50), firstname VARCHAR(50), lastname VARCHAR(50), password VARCHAR(255), address VARCHAR(50) ,bio VARCHAR(500) ,occupation VARCHAR(50) ,expertise VARCHAR(50) ,role varchar(20) , PRIMARY KEY(userId));
		  
		  CREATE TABLE IF NOT EXISTS sessions (sessionId SERIAL, menteeId INTEGER REFERENCES users(userId) ON DELETE CASCADE,mentorId INTEGER REFERENCES users(userId) ON DELETE CASCADE, menteeEmail VARCHAR(250), status VARCHAR(250), PRIMARY KEY(sessionId) );
		  
		  CREATE TABLE IF NOT EXISTS review (sessionId INTEGER  REFERENCES sessions(sessionId) ON DELETE CASCADE, mentorId integer REFERENCES users(userId) ON DELETE CASCADE, menteeId integer REFERENCES users(userId) ON DELETE CASCADE , score integer,menteeFullName VARCHAR(50) , remark VARCHAR(255) );
		  
		`);
		conn.end();
	}





}

export default Database;