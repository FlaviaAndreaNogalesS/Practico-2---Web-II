module.exports = (sequelize, Sequelize) => {
    const MovieActors = sequelize.define("MovieActors", {
        movieId: {
            type: Sequelize.INTEGER,
            references: {
                model: 'Movies',
                key: 'id'
            }
        },
        actorId: {
            type: Sequelize.INTEGER,
            references: {
                model: 'Actors',
                key: 'id'
            }
        }
    });
    return MovieActors;
};
