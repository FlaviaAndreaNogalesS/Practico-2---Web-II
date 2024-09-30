module.exports = app => {
    // Importa las rutas de películas
    require('./pelicula.routes')(app);
};

