module.exports = app => {
    // Crea un nuevo enrutador
    let router = require("express").Router();
    // Importa el controlador de películas
    const controller = require("../controllers/pelicula.controller.js");

    // Define las rutas de la API
    router.get('/', controller.listPeliculas);
    router.post('/', controller.createPelicula);
    router.get('/:id', controller.getPeliculaById); 
    router.get('/actor/:actorId', controller.getPeliculasByActor);
    router.get('/director/:directorId', controller.getPeliculasByDirector);
    
     // Registra el enrutador bajo'/peliculas'
    app.use('/peliculas', router);
    
};
