const { Actors } = require('../models/actors.model');

// Utils
const { filterObj } = require('../utils/filterObj');
const { catchAsync } = require('../utils/catchAsync');
const { AppError } = require('../utils/appError');

exports.getAllActors = catchAsync(async(req, res, next) => {});
exports.getActorById = catchAsync(async(req, res, next) => {});
exports.createNewActor = catchAsync(async(req, res, next) => {});
exports.deleteActor = catchAsync(async(req, res, next) => {});