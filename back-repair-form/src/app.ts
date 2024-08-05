import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import 'dotenv/config';

import * as middlewares from './middlewares';
import api from './api/index';

require('dotenv').config();
const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use('/api/v1', api);

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../docs/swagger.json');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(middlewares.errorHandler);
app.use(middlewares.notFound);

export default app;
