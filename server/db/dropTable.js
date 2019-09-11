import Database from './db';

const dropTable = async () => {

	const conn = Database.dbConnection();

	const result = await conn.query(`

    DROP TABLE IF EXISTS users CASCADE;

    DROP TABLE IF EXISTS sessions CASCADE;

    DROP TABLE IF EXISTS reviews CASCADE;

  `);

	await conn.end();

	return result;

};

dropTable();