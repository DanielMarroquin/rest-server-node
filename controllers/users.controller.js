const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const User = require('../models/users');

const getUsers = async (req = request, res = response) => {
    // Parametros de segmento query 
    // REalizo la peticion de todos los usuarios al modelo
    const { limit=5, page=0 } = req.body;
    const statusQuery = { status: true };

    // const users = await User.find(statusQuery)
    //     .limit(Number(limit))
    //     .skip(Number(page));
    // const totalUsers = await User.countDocuments(statusQuery);

    const [ total, users ] = await Promise.all([
        User.countDocuments(statusQuery),
        User.find(statusQuery)
            .limit(Number(limit))
            .skip(Number(page))
    ]);

    res.json({
        total,
        users
    }); 
}

const postUsers = async (req, res = response) => {


    const { name, email, password, role } = req.body;
    const user = new User({ name, email, password, role });

    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync( password, salt );
    //Guardar en DB
    await user.save();

    res.json({
        message: 'POST-API Controlador',
        user
    });
}

const putUsers = async (req, res = response) => {

    const { id } = req.params;
    const {_id, password, google, email, ...restObjects } = req.body;
    // Validar contra base de datos
    if ( password ){
        //Encriptar contraseña
        const salt = bcryptjs.genSaltSync();
        restObjects.password = bcryptjs.hashSync( password, salt );
    }

    const user = await User.findByIdAndUpdate( id, restObjects );

    
    res.json({
        message: 'PUT-API Controlador',
        user
    });
}

const deleteUsers = async (req, res = response) => {

    const { id } = req.params;
    // const uid = req.uid;
    const deleteUser = await User.findByIdAndUpdate(id, { status: false });
    // const userAutenticate = req.user;

    res.json({
        deleteUser
        // userAutenticate
    });
}

module.exports = {
    getUsers,
    postUsers,
    putUsers,
    deleteUsers
}