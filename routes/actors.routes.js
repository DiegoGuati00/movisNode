const express = require('express');

// Controllers
const {
    getAllActors,
    getActorById,
    createNewActor,
    updateActor,
    deleteActor
} = require('../controllers/users.controller');