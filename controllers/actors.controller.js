//models
const { Actors } = require('../models/actors.model');

// Utils
const { filterObj } = require('../utils/filterObj');
const { catchAsync } = require('../utils/catchAsync');
const { AppError } = require('../utils/appError');

exports.getAllActors = catchAsync(async(req, res, next) => {
    const actors = await Actors.findAll({
        where: { status: 'active' }
    });

    res.status(200).json({
        status: 'success',
        data: {
            actors
        }
    });
});

exports.getActorById = catchAsync(async(req, res, next) => {
    const { id } = req.params;

    // SELECT * FROM posts WHERE id = 1;
    const actor = await Actors.findOne({
        where: { id: id, status: 'active' }
    });

    if (!actor) {
        return next(new AppError(404, 'No post found with the given ID'));
    }

    res.status(200).json({
        status: 'success',
        data: {
            actor
        }
    });
});

exports.createNewActor = catchAsync(async(req, res, next) => {
    const { name, country, rating, age, profilePic } = req.body;

    if (!name || !country || !rating || !age || !profilePic) {
        return next(
            new AppError(400, 'Some data it indefined')
        );
    }

    // INSERT INTO posts (title, content, userId) VALUES ('A new post', 'Saved in db', 1)
    const newActor = await Actors.create({
        name,
        country,
        rating,
        age,
        profilePic
    });

    res.status(201).json({
        status: 'success',
        data: { newActor }
    });
});

exports.updateActor = catchAsync(async(req, res, next) => {
    const { id } = req.params;
    const data = filterObj(req.body, 'name', 'country', 'rating', 'age', 'profilePic'); // { title } | { title, author } | { content }

    const actor = await Actors.findOne({
        where: { id: id, status: 'active' }
    });

    if (!actor) {
        return next(
            new AppError(404, 'Can\'t update post, maybe invalid ID')
        );
    }

    await actor.update({...data }); // .update({ title, author })

    res.status(204).json({ status: 'success' });
});

exports.deleteActor = catchAsync(async(req, res, next) => {
    const { id } = req.params;

    const actor = await Actors.findOne({
        where: { id: id, status: 'active' }
    });

    if (!actor) {
        return next(
            new AppError(404, 'Can\'t update post, maybe invalid ID')
        );
    }

    // DELETE FROM posts WHERE id = 1;
    // await post.destroy();

    // Soft delete
    await post.update({ status: 'deleted' });

    res.status(204).json({ status: 'success' });
});