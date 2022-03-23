// Models
const { Users } = require('../models/users.model');
const { Actors } = require('../models/actors.model');
const { ActorsInMovies } = require('../models/actorsInMovies.model');
const { Movies } = require('../models/movies.model');
const { Reviews } = require('../models/reviews.model');

const initModel = () => {
    // 1 User <--> M Review
    Users.hasMany(Reviews);
    Reviews.belongsTo(Users);

    // 1 Movie <--> M Review
    Movies.hasMany(Reviews);
    Reviews.belongsTo(Movies);

    // M Movie <--> M Actor
    Movies.belongsToMany(Actors, { through: ActorsInMovies });
    Actors.belongsToMany(Movies, { through: ActorsInMovies });
};

module.exports = { initModel };