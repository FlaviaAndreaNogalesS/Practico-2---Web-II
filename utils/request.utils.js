module.exports = {
    //valida si los campos requeridos están presentes en la solicitud
    isRequestValid: (requiredFields, body, res) => {
        for (const field of requiredFields) {
            if (!body[field]) {
                res.status(400).json({
                    msg: `Falta el campo ${field}`
                });
                return false;
            }
        }
        return true;
    },

    //caso de error
    sendError500: (error, res) => {
        console.error('Error:', error);
        res.status(500).json({
            msg: 'Error en el servidor',
            error: error.message // Mensaje detallado del error
        });
    }
};
