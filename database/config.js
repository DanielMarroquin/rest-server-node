const mongoose = require ('mongoose');

const dbConnection = async() => {
    try {


        await mongoose.connect( process.env.MONGO_DB, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // useCreateIndex: true,
            // useFindAndModify: false
        });

        console.log('Base de datos en línea');

        
    } catch (err) {
        console.log(err);
        throw new Error('Error en la conexión de la base de datos');
    }

}

module.exports = {
    dbConnection
}