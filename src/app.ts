import cors from 'cors';
import express from 'express';
import morgan from 'morgan';
import db from './db/db';

import api from './api';
import MessageResponse from './interfaces/MessageResponse';
import * as middlewares from './middlewares';
import path from 'path';

require('dotenv').config();

const app = express();
db();
app.use(morgan('dev'));
app.use(cors());
app.use(
  '/files/user',
  express.static(path.resolve(__dirname, '..', 'public', 'img', 'user'))
);
app.use(
  '/files/company',
  express.static(path.resolve(__dirname, '..', 'public', 'img', 'companys'))
);
app.use(
  '/files/product',
  express.static(path.resolve(__dirname, '..', 'public', 'img', 'product'))
);

app.use(express.json());

app.get<{}, MessageResponse>('/', (req, res) => {
  res.json({
    message: '🦄🌈✨👋🌎🌍🌏✨🌈🦄',
  });
});

app.use('/api/v1', api);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

export default app;
