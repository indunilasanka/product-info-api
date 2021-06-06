/**
 * @author asankawai
 */

// Core modules
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import HttpStatus from 'http-status-codes';
import compression from 'compression';

// Custom modules
import router from './api/index';
import { createSuccessResponse } from './middleware/responseGenerator';
import errorHandler from './middleware/errorHandler';
import NotFoundException from './exception/NotFoundException';
import initializer from './initializer';
import { PORT } from './config/configs';
import logger from './util/logger';
import correlation from './middleware/correlation';

const app = express();

const port = PORT;

// standard middleware
app.use(cors());
app.use(compression());
app.use(correlation());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.on('ready', () => {
  app.listen(port, () => {
    logger.info(`product-info API listening at port: ${port}`);
  });
});

// Health check API
app.get('/v1/product-info/health-check', (req, res) => {
  const health = {
    uptime: process.uptime(),
    memoryUsage: process.memoryUsage(),
    nodeVersion: process.versions.node,
    nodeEnv: process.env.NODE_ENV,
    deploymentEnv: process.env.STAGE,
    versionId: process.env.VERSION_ID,
  };

  res.status(HttpStatus.OK).send(createSuccessResponse(health));
});

// Set Express router with API version prefix
app.use('/v1/product-info', router);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new NotFoundException();
  next(err);
});

// error handler
app.use(errorHandler());

// configuration initializer
initializer(app);

// export express app for supertest (unit test & integration test) framework use.
exports.app = app;
