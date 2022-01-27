require('dotenv').config();

const Server = require('./models/server');
//La declaracion de la variable para importar el modelo va con mayuscula


const server = new Server();


server.listen();



