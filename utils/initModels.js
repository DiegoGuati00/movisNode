// Models
const { Users } = require('../models/users.model');
const { Actors } = require('../models/actors.model');
const { ActorsInMovies } = require('../models/actorsInMovies.model');
const { Movis } = require('../models/movis.model');
const { Reviews } = require('../models/reviews.model');

const initModel = () => {
    // 1 User <--> M Review
    Users.hasMany(Reviews);
    Reviews.belongsTo(Users);

    // 1 Movie <--> M Review
    Movis.hasMany(Reviews);
    Reviews.belongsTo(Movis);

    // M Movie <--> M Actor
    Movis.belongsToMany(Actors, { through: ActorsInMovies });
    Actors.belongsToMany(Movis, { through: ActorsInMovies });
};

module.exports = { initModel };