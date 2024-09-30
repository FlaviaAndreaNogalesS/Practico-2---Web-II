module.exports = (sequelize, Sequelize) => {
    const Director = sequelize.define("Director", {
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        photoUrl: {
            type: Sequelize.STRING,
            allowNull: false
        }
    });
    return Director;
};
