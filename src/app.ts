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

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS'); // Permite todos os métodos HTTP
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
})
app.use(morgan('dev'));
app.use(express.json());

app.get<{}, MessageResponse>('/', (req, res) => {
  res.json({
    message: '🦄🌈✨👋🌎🌍🌏✨🌈🦄',
  });
});

/*
  fazerBackupMongoDB().then(() => {
    console.log('Backup do banco de dados concluído.');
  }).catch((error) => {
    console.error('Erro ao fazer o backup do banco de dados:', error);
  });
  */
app.use('/api/v1', api);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

export default app;
