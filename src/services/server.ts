import express, { Request, NextFunction, Response } from 'express';
import path from 'path';
import * as http from 'http';
import { ErrorRequestHandler } from 'express';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import swaggerUi from 'swagger-ui-express';

import chatRouter from '../routes/chat';
import apiRouter from '../routes/index';
import multer from './multer';
import { initWsServer } from './sockets';
import docs from '../docs/index';

const app = express();
app.use(compression());

app.use(multer);

app.use(cookieParser());

app.set('view engine', 'ejs');
app.set('views', 'views');

const publicFolderPath = path.resolve(__dirname, '../../public');
app.use(express.static(publicFolderPath));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/chat', chatRouter);
app.use('/api', apiRouter);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(docs));

app.use(express.static(path.join(__dirname, '../../images')));

const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
  res.status(error.statusCode || 500);

  res.send({
    error: {
      status: error.statusCode || 500,
      message: error.message,
    },
  });
};

app.use(errorHandler);

const myServer = new http.Server(app);
initWsServer(myServer);

export default myServer;
