const logger = require('./logger');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method);
  logger.info('Path', request.path);
  logger.info('Body', request.body);
  logger.info('---');
  next();
};

const tokenExtractor = async (request, response, next) => {
  const authorization = await request.get('authorization');
  if (authorization && authorization.startsWith('bearer ')) {
    const token = authorization.replace('bearer ', '');
    const decodedToken = jwt.verify(token, process.env.SECRET);
    request.token = decodedToken;
  }
  next();
};

const userExtractor = async (request, response, next) => {
  request.user = await User.findById(request.token.id);
  console.log('In User Extractor', request.user);
  next();
};

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};

const errorHandler = (error, request, response, next) => {
  logger.error(error.message);

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' });
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message });
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(400).json({ error: error.message });
  } else if (error.name === 'TokenExpiredError') {
    return response.status(401).json({ error: 'token expired' });
  }
  next(error);
};

module.exports = {
  requestLogger,
  tokenExtractor,
  userExtractor,
  unknownEndpoint,
  errorHandler,
};
