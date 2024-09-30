const db = require("../models");
const { sendError500 } = require("../utils/request.utils");

// Lista todas las películas
exports.listPeliculas = async (req, res) => {
    try {
        const peliculas = await db.peliculas.findAll({
            include: [
                {
                    model: db.directores,  //datos de directos
                    as: "director",        
                    attributes: ["id", "name", "photoUrl"]
                },
                {
                    model: db.actores,   //datos de actores
                    as: "actores",        
                    attributes: ["id", "name", "photoUrl"], 
                    through: { attributes: [] }
                }
            ]
        });
        res.json(peliculas);
    } catch (error) {
        sendError500(error, res);
    }
};

//crea la pelicula
exports.createPelicula = async (req, res) => {
    const requiredFields = ['name', 'synopsis', 'directorId'];
    
    // Verifica que los campos requeridos estén presentes en la solicitud
    if (!isRequestValid(requiredFields, req.body, res)) {
        return;
    }

    try {
        const { name, synopsis, image, releaseDate, rating, trailerUrl, directorId, actors } = req.body;
        
        // Crea nueva película
        const pelicula = await db.peliculas.create({
            name, synopsis, image, releaseDate, rating, trailerUrl, directorId
        });

        // actores asociados se agregan a la relación muchos a muchos
        if (actors && actors.length > 0) {
            await pelicula.setActores(actors);
        }

        res.status(201).json(pelicula);
    } catch (error) {
        sendError500(error, res);
    }
};

// valida los campos requeridos en la solicitud
const isRequestValid = (requiredFields, body, res) => {
    for (let field of requiredFields) {
        if (!body[field]) {
            res.status(400).json({ msg: `Campo requerido ${field} no proporcionado.` });
            return false;
        }
    }
    return true;
};

//obtiene los detalles de la pelicula por id
exports.getPeliculaById = async (req, res) => {
    const id = req.params.id;
    try {
        const pelicula = await db.peliculas.findByPk(id, {
            include: [
                {
                    model: db.directores,
                    as: "director",
                    attributes: ["id", "name", "photoUrl"]
                },
                {
                    model: db.actores,
                    as: "actores",
                    attributes: ["id", "name", "photoUrl"],
                    through: { attributes: [] }
                }
            ]
        });
        if (!pelicula) {
            return res.status(404).json({ msg: "Película no encontrada" });
        }
        res.json(pelicula);
    } catch (error) {
        console.error('Error al obtener los detalles de la película:', error);
        res.status(500).json({ msg: "Error en el servidor", error });
    }
};

//  películas por actor
exports.getPeliculasByActor = async (req, res) => {
    const actorId = req.params.actorId;
    try {
        const peliculas = await db.peliculas.findAll({
            include: [
                {
                    model: db.actores,
                    as: "actores",
                    where: { id: actorId },
                    attributes: ["id", "name", "photoUrl"],
                    through: { attributes: [] }
                },
                {
                    model: db.directores,
                    as: "director",
                    attributes: ["id", "name", "photoUrl"]
                }
            ]
        });
        res.json(peliculas);
    } catch (error) {
        console.error('Error al obtener las películas por actor:', error);
        res.status(500).json({ msg: "Error en el servidor", error });
    }
};

// películas por director
exports.getPeliculasByDirector = async (req, res) => {
    const directorId = req.params.directorId;
    try {
        const peliculas = await db.peliculas.findAll({
            where: { directorId },
            include: [
                {
                    model: db.directores,
                    as: "director",
                    attributes: ["id", "name", "photoUrl"]
                },
                {
                    model: db.actores,
                    as: "actores",
                    attributes: ["id", "name", "photoUrl"],
                    through: { attributes: [] }
                }
            ]
        });
        res.json(peliculas);
    } catch (error) {
        console.error('Error al obtener las películas por director:', error);
        res.status(500).json({ msg: "Error en el servidor", error });
    }
};





