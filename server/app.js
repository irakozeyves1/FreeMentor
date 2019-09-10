import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import userRoutes from './routes/user.route';

import swaggerUi from 'swagger-ui-express';
import swaggerDoc from './swagger.json';

import Database from './db/db';

Database.createScripts();
 
dotenv.config();

const app = express();

app.use(bodyParser.json());

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

app.use('/api/v1', userRoutes);

//Index Of FreeMentor 

app.get('/', (req, res) => res.status(200).json({
	status: 200,
	message: 'Welcome to FreeMentor, Online FreeMentorship Program.'
}));

app.use((req, res) => (res.status(404).json({ status: 404, message: 'Route not found' })));


export default app;