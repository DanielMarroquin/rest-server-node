const { response } = require ('express');
const bcryptjs = require ('bcryptjs');

const User = require('../models/users');
const { generateJwt } = require('../helpers/generate-jwt');
const { googleVerify } = require('../helpers/google-verify');
const { json } = require('express/lib/response');

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
}

const googleSingIn = async ( req, res ) => {

    const { id_token } = req.body

    try {
        
        // const googleUser = await googleVerify( id_token );
        // console.log( googleUser );
        const { name, picture, email } = await googleVerify( id_token );

        let user = await User.findOne({ email });

        if ( !user ) {
            // Si no existe  lo creo
            const data = {
                name,
                email,
                password: ':P',
                picture,
                role: 'USER_ROLE',
                google: true
            };

            user = new User(data);
            await user.save();
        }

        // Si el usuario de Google no esta en DB

        if ( !user.status ) {
            return res.status(401).json({
                msg: 'Comuniquese con el Administrador, usuario bloqueado'
            });
        }

        // Generar el JWT
        const token = await generateJwt( user.id );

        res.json({
            // msg: 'Login Correcto',
            user,
            token
        });

    } catch (error) {

        console.log(user, token, 'error google');
        res.status(400).json({
            ok: false,
            msg: 'Token de Google no se pudo verificar'
        });
    }

}


module.exports = {
    login,
    googleSingIn
}