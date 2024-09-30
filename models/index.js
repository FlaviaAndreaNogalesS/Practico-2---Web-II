const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");

// Inicializa Sequelize
const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD,
    {
        host: dbConfig.HOST,
        port: dbConfig.PORT,
        dialect: "mysql",
        define: {
            timestamps: false  // Desactiva los timestamps
        }
    }
);

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Importar modelos
db.directores = require("./director.model.js")(sequelize, Sequelize);
db.actores = require("./actor.model.js")(sequelize, Sequelize);
db.peliculas = require("./movie.model.js")(sequelize, Sequelize);
db.movieActors = require("./movieActor.model.js")(sequelize, Sequelize);

// Relaciones
// Una película pertenece a un director
db.peliculas.belongsTo(db.directores, { as: "director", foreignKey: "directorId" });
db.directores.hasMany(db.peliculas, { foreignKey: "directorId" });

// Relación muchos a muchos entre películas y actores
db.peliculas.belongsToMany(db.actores, {
    through: db.movieActors,
    as: "actores",
    foreignKey: "movieId"
});
db.actores.belongsToMany(db.peliculas, {
    through: db.movieActors,
    as: "peliculas",
    foreignKey: "actorId"
});

module.exports = db;
