const Role = require('../models/role');
const { User, Category, Product } = require('../models');

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

//Validamos si la categoria existe por ID

const validateCategoryById = async ( id ) => {
    const haveCategory = await Category.findById( id );
    if ( !haveCategory ) {
        throw new Error(`El ID ${ id } de categoría no existe`);
    }
}

const validateProductById = async ( id ) => {
    const haveProduct = await Product.findById( id );
    if ( !haveProduct ) {
        throw new Error(`El ID ${ id } de producto no existe`);
    }
}


module.exports = { 
    rolValidate,
    emailValite,
    validateUserById,
    validateCategoryById,
    validateProductById
}