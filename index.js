const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const port = 3001; //puerto api

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// Importa los modelos y sincroniza la bd
const db = require("./models");
db.sequelize.sync().then(() => {
    console.log("db resync");
});

// Importa y registra las rutas de la aplicación
require('./routes')(app);

app.listen(port, () => {
    console.log(`Servidor backend iniciado en http://localhost:${port}`);
});