const Role = require('../models/role');
const User = require('../models/users');

const rolValidate = async (role = '' ) => {
    const haveRole = await Role.findOne({ role });
    if ( !haveRole ){
        throw new Error(`El rol ${ role } no esta regisrrado en DB`)
    }
}

const emailValite = async (email = '' ) => {
    const haveEmail = await User.findOne({ email });
    if ( haveEmail ) {
        throw new Error(`El correo ${ email } ya esta registrado`)
    }
}

const validateUserById = async ( id ) => {
    const haveUser = await User.findById( id );
    if ( !haveUser ) {
        throw new Error(`El ID ${ id } no existe`)
    }
}


module.exports = { 
    rolValidate,
    emailValite,
    validateUserById
}