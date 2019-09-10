import Database from './db';



const dropTable = async () => {

	const conn = Database.dbConnection();

	const result = await conn.query(`

    DROP TABLE IF EXISTS users CASCADE;

    DROP TABLE IF EXISTS bookings CASCADE;

    DROP TABLE IF EXISTS trips CASCADE;

  `);

	await conn.end();

	return result;

};



dropTable();