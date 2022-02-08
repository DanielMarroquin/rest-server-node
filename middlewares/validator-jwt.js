const jwt = require ('jsonwebtoken');


const User = require('../models/users');


const validationJwt = async ( req, res, next ) => {
    const token = req.header('x-token');
    
    if ( !token ) {
        return res.status(401).json({
            msg: 'No existe token en la peticion'
        });
    }

    try {

        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

        // Lee el usuario que corresponde al uid
        const user = await User.findById( uid );

        // Verificar si el usuario existe

        if ( !user ) {
            return res.status(402).json({
                msg: 'Token no valido --Usuario no existe'
            });
        }

        // Verificar si el uid esta en estado activo
        if ( !user.status ) {
            return res.status(402).json({
                msg: 'Token no valido --Usuario inactivo'
            });
        }

        req.user = user;

        next();

    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Token Invalido'
        });
        
    }
    

}


module.exports = {
    validationJwt
}