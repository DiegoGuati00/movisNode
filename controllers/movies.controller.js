const { ref, uploadBytes, getDownloadURL } = require('firebase/storage');
const { validationResult } = require('express-validator');
//movis
const { Movies } = require('../models/movies.model');
const { Actors } = require('../models/actors.model');
const { ActorsInMovies } = require('../models/actorsInMovies.model');
// Utils
const { filterObj } = require('../utils/filterObj');
const { catchAsync } = require('../utils/catchAsync');
const { AppError } = require('../utils/appError');
const { storage } = require('../util/firebase');

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
    const { movie } = req;

    res.status(200).json({
        status: 'success',
        data: { movie }
    });
});

exports.createNewMovies = catchAsync(async(req, res, next) => {
    const { title, description, duration, rating, genre, actors } = req.body

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const errorMsg = errors
            .array()
            .map(({ msg }) => msg)
            .join('. ');
        return next(new AppError(400, errorMsg));
    }

    const fileExtension = req.file.originalname.split('.')[1];

    const imgRef = ref(
        storage,
        `imgs/movies/${title}-${Date.now()}.${fileExtension}`
    );

    const imgUploaded = await uploadBytes(imgRef, req.file.buffer);

    const newMovie = await Movies.create({
        title,
        description,
        duration,
        img: imgUploaded.metadata.fullPath,
        rating,
        genre
    });

    const actorsInMoviesPromises = actors.map(async(actorId) => {
        // Assign actors to newly created movie
        return await ActorsInMovies.create({ actorId, movieId: newMovie.id });
    });

    await Promise.all(actorsInMoviesPromises);

    res.status(200).json({
        status: 'success',
        data: { newMovie }
    });
});

exports.updateMovies = catchAsync(async(req, res, next) => {
    const { movie } = req;

    const data = filterObj(
        req.body,
        'title',
        'description',
        'duration',
        'rating',
        'genre'
    );

    await movie.update({...data });

    res.status(204).json({ status: 'success' });
});

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