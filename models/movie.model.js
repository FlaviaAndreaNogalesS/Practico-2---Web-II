module.exports = (sequelize, Sequelize) => {
    const Movie = sequelize.define("Movie", {
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        synopsis: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        image: {
            type: Sequelize.STRING,
            allowNull: false
        },
        releaseDate: {
            type: Sequelize.DATE,
            allowNull: false
        },
        rating: {
            type: Sequelize.FLOAT,
            allowNull: false
        },
        trailerUrl: {
            type: Sequelize.STRING,
            allowNull: false
        },
        directorId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'Directors',
                key: 'id'
            }
        }
    });
    return Movie;
};
