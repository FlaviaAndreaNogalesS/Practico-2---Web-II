module.exports = (sequelize, Sequelize) => {
    //define el modelo actor
    const Actor = sequelize.define("Actor", {
        name: {
            type: Sequelize.STRING,
            allowNull: false //obligatorio
        },
        photoUrl: {
            type: Sequelize.STRING,
            allowNull: false
        }
    });
    return Actor;
};
