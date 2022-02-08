const { response } = require ('express');
const bcryptjs = require ('bcryptjs');

const User = require('../models/users');
const { generateJwt } = require('../helpers/generate-jwt');

const login = async ( req, res = response ) => {

    const { email, password } = req.body;

    try {
        //Verificar si email existe
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                msg: 'Usuario/Password son incorrectos --email'
            });
        }
        //SI el usuario esta activo
        if (!user.status) {
            return res.status(400).json({
                msg: 'Usuario/Password son incorrectos --status'
            });
        }
        // Verificar la contraseña
        const validatePass = bcryptjs.compareSync(password, user.password);
        if ( !validatePass ) {
            return res.status(400).json({
                msg: 'Usuario/Password son incorrectos --password'
            });
        }

        // Generar JWT
        const token = await generateJwt( user.id )

        res.json({
            user,
            token
        })
        
    } catch (err) {
        console.log(err)
        res.status(500).json({
            msg: 'Función no retorna datos'
        });
    }

    // res.json({
    //     msg: 'Login Access Ok'
    // })
}


module.exports = {
    login
}