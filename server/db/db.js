// import { Pool } from 'pg';
import { User } from '../models/user.model';
import Environment from '../config/db';


class Database extends Environment {
	static dbConnection() {
		return Environment.dbConnection();
	}

	static async addUser(data) {
		const con = this.dbConnection();
		const newUser = await con.query(`Insert into users(firstname, lastname, email, password, address, bio, occupation, expertise, role) values(
            '${data.firstname}',
            '${data.lastname}',
            '${data.email}',
            '${data.password}',
            '${data.address}',
            '${data.bio}',
            '${data.occupation}',
            '${data.expertise}',
            '${data.role}'
        ) returning *`);
		await con.end();
		return newUser;
	}

	static async addSession(data) {
		const con = this.dbConnection();
		const newSession = await con.query(`Insert into sessions(mentorId, menteeId, questions, menteeEmail, status) values(
            ${data.mentorId},
            ${data.menteeId},
            '${data.questions}',
            '${data.menteeEmail}',
            '${data.status}'
        ) returning *`);
		await con.end();
		return newSession;
	}

	static async selectAll(table) {
		const con = this.dbConnection();
		const result = await con.query(`SELECT * FROM ${table}`);
		await con.end();
		return result;
	}

	static async selectBy(table, column, value) {
		const con = this.dbConnection();
		const result = await con.query(`SELECT * FROM ${table} WHERE ${column}='${value}'`);
		await con.end();
		return result;
	}

	static async updateSession(table, column, value, column1, value1) {
		const con = this.dbConnection();
		const result = await con.query(`UPDATE ${table} SET ${column} = '${value}' WHERE ${column1} = ${value1
		} returning *;`);
		await con.end();
		return result;
	}
	static async updateUser(id, role) {
		const conn = this.dbConnection();
		const result = await conn.query(`UPDATE users SET role = '${role}' WHERE userid = ${id};`);
		await conn.end();
		return result;
	}

	static async deleteSession(table, id) {
		const conn = this.dbConnection();
		const result = await conn.query(`DELETE from ${table} WHERE sessionid = ${id};`);
		await conn.end();
		return result;
	}

	static async selectCount(table, column, value) {
		const con = this.dbConnection();
		const result = await con.query(`SELECT COUNT(1) FROM ${table} WHERE ${column} = '${value}';`);
		await con.end();
		return result;
	}

	static async createScripts() {
		const con = this.dbConnection();
		await con.query(`
        CREATE TABLE IF NOT EXISTS USERS (userId SERIAL,firstname VARCHAR(250),lastname VARCHAR(250),email VARCHAR(250), password VARCHAR(250), address VARCHAR (30), bio VARCHAR(250), occupation VARCHAR(250), expertise VARCHAR(250), role VARCHAR(250),PRIMARY KEY(userId));
    
        CREATE TABLE IF NOT EXISTS SESSIONS(sessionId SERIAL,menteeId INTEGER REFERENCES users(userId) ON DELETE CASCADE,mentorId INTEGER REFERENCES users(userId) ON DELETE CASCADE, menteeEmail VARCHAR(300), questions VARCHAR(200),status VARCHAR(250),PRIMARY KEY (sessionId));
        CREATE TABLE IF NOT EXISTS REVIEWS (sessionId INTEGER REFERENCES sessions(sessionId) ON DELETE CASCADE,menteeId INTEGER REFERENCES users(userId) ON DELETE CASCADE,mentorId INTEGER REFERENCES users(userId) ON DELETE CASCADE,menteefirstName VARCHAR(300),menteelastName VARCHAR(300),remark VARCHAR(300));
        `);
		await con.end();
		const result = await this.selectCount('users','email', 'irakozeyves@gmail.com');
		if(result.rows[0].count === '0'){
			await this.addUser(new User('irakozeyves@gmail.com', 'irakoze', 'yves', '$2b$10$bL8S6QlxA7WD6q.ggn6Ep.FFk0XggwXFCcgtyPGwmo8cnXs26Rj0i', 'rwanda', 'kimironko, 1996,gasabo', 'teacher', '5 years', 'Admin'));
		}

	}
 
}

export default Database;