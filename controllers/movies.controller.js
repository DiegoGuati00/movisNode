//movis
const { Movies } = require('../models/movies.model');

// Utils
const { filterObj } = require('../utils/filterObj');
const { catchAsync } = require('../utils/catchAsync');
const { AppError } = require('../utils/appError');

exports.getAllMovies = catchAsync(async(req, res, next) => {
    const movie = await Movies.findAll({
        where: { status: 'active' }
    });

    res.status(200).json({
        status: 'success',
        data: {
            movie
        }
    });
});
exports.getMoviesById = catchAsync(async(req, res, next) => {
    const { id } = req.params;

    // SELECT * FROM posts WHERE id = 1;
    const movie = await Movies.findOne({
        where: { id: id, status: 'active' }
    });

    if (!movie) {
        return next(new AppError(404, 'No movie found with the given ID'));
    }

    res.status(200).json({
        status: 'success',
        data: {
            movie
        }
    });
});

exports.createNewMovies = catchAsync(async(req, res, next) => {});
exports.updateMovies = catchAsync(async(req, res, next) => {});

exports.deleteMovies = catchAsync(async(req, res, next) => {
    const { id } = req.params;

    const movie = await Movies.findOne({
        where: { id: id, status: 'active' }
    });

    if (!movie) {
        return next(
            new AppError(404, 'Can\'t update movie, maybe invalid ID')
        );
    }

    await post.update({ status: 'deleted' });

    res.status(204).json({ status: 'success' });
});