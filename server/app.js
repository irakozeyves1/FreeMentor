import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import userRoutes from './routes/user.route';

import swaggerUi from 'swagger-ui-express';
import swaggerDoc from './swagger.json';

import { Database } from './database/database';

dotenv.config();

const db = new Database();
db.createDb();

const app = express();

app.use(bodyParser.json());

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

app.use('/api/v1', userRoutes);


export default app;