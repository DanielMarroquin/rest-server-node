const { response } = require('express');

const getUsers = (req, res = response) => {
    // Parametros de segmento query
    const {q, name, apikey } = req.query;

    res.json({
        message: 'GET-API Controlador',
        q, name, apikey
    });
}

const postUsers = (req, res = response) => {

    const { name, age } = req.body;

    res.json({
        message: 'POST-API Controlador',
        name, age
    });
}

const putUsers = (req, res = response) => {

    const { id } = req.params;
    
    res.json({
        message: 'PUT-API Controlador',
        id
    });
}

const deleteUsers = (req, res = response) => {
    res.json({
        message: 'DEL-API Controlador'
    });
}

module.exports = {
    getUsers,
    postUsers,
    putUsers,
    deleteUsers
}