const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
//models
const { Users } = require('../models/users.model');

// Utils
const { filterObj } = require('../utils/filterObj');
const { catchAsync } = require('../utils/catchAsync');
const { AppError } = require('../utils/appError');
const { config } = require('../config/config');

exports.getAllUsers = catchAsync(async(req, res, next) => {
    const users = await Users.findAll({
        where: { status: 'active' },
        attributes: { exclude: ['password'] }
    });

    res.status(200).json({
        status: 'success',
        data: { users }
    });
});

exports.getUserById = catchAsync(async(req, res, next) => {
    const { id } = req.params;

    const user = await Users.findOne({ where: { id } });

    if (!user) {
        return next(new AppError(404, 'User not found'));
    }

    res.status(200).json({
        status: 'success',
        data: { user }
    });
});

exports.createNewUser = catchAsync(async(req, res, next) => {
    const { username, email, password, role } = req.body;

    if (!username || !email || !password) {
        return next(
            new AppError(400, 'Must provide a valid name, email and password')
        );
    }

    const salt = await bcrypt.genSalt(12);

    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await Users.create({
        username,
        email,
        password: hashedPassword,
        role: role || 'guest'
    });

    // Remove password from response
    newUser.password = undefined;

    res.status(201).json({
        status: 'success',
        data: { newUser }
    });
});

exports.deleteUser = catchAsync(async(req, res, next) => {
    const { id } = req.params;

    const user = await Users.findOne({
        where: { id: id, status: 'active' }
    });

    if (!user) {
        return next(
            new AppError(404, 'Can\'t update post, maybe invalid ID')
        );
    }

    await Users.update({ status: 'deleted' });

    res.status(204).json({ status: 'success' });
});

exports.updateUsers = catchAsync(async(req, res, next) => {
    const { id } = req.params;
    const data = filterObj(req.body, 'username', 'email', 'role', 'password');

    const user = await Users.findOne({
        where: { id: id, status: 'active' }
    });

    if (!user) {
        return next(
            new AppError(404, 'Can\'t update post, maybe invalid ID')
        );
    }

    await user.update({...data }); // .update({ title, author })

    res.status(204).json({ status: 'success' });
});

exports.loginUser = catchAsync(async(req, res, next) => {
    const { email, password } = req.body;

    // Find user given an email and has status active
    const user = await Users.findOne({
        where: { email, status: 'active' }
    });

    // Compare entered password vs hashed password
    if (!user || !(await bcrypt.compare(password, user.password))) {
        return next(new AppError(400, 'Credentials are invalid'));
    }

    // Create JWT
    const token = await jwt.sign({ id: user.id }, // Token payload
        config.JWTsecret, // Secret key
        {
            expiresIn: config.JWTexpire
        }
    );

    res.status(200).json({
        status: 'success',
        data: { token }
    });
});