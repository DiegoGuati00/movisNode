const express = require('express');

// Controllers
const { globalErrorHandler } = require('./controllers/error.controller');

// Routers
const { actorsRouter } = require('./routes/actors.routes');
const { actorsInMoviesRouter } = require('./routes/actorsInMovies.routes');
const { moviesRouter } = require('./routes/movis.routes');
const { reviewsRouter } = require('./routes/reviews.routes');
const { usersRouter } = require('./routes/users.routes');

// Utils
const { AppError } = require('./utils/appError');

const app = express();

// Enable JSON incoming data
app.use(express.json());

// Endpoints
app.use('/api/v1/actors', actorsRouter);
app.use('/api/v1/actorsInMovies', actorsInMoviesRouter);
app.use('/api/v1/movies', moviesRouter);
app.use('/api/v1/reviews', reviewsRouter);
app.use('/api/v1/users', usersRouter);
app.use('*', (req, res, next) => {
    next(new AppError(404, `${req.originalUrl} not found in this server.`));
});
// Error handler (err -> AppError)
app.use(globalErrorHandler);

module.exports = { app };