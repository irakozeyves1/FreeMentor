import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import userRoutes from './routes/user.route';

import swaggerUi from 'swagger-ui-express';
import swaggerDoc from './swagger.json';

dotenv.config();

const app = express();

app.use(bodyParser.json());

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

app.use('/api/v1', userRoutes);


export default app;