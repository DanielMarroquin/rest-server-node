const { response } = require('express');
const { Product } = require('../models')

// const Categories = require('../models/category')

//Obtener Productos - paginado - total - populate
const getAllProducts = async (req, res) => {

    const { limit = 5, page = 0 } = req.query;
    const query = { status: true };

    const [ total, products ] = await Promise.all([
        Product.countDocuments(query),
        Product.find(query)
            .populate('user', 'name')
            .populate('category', 'name')
            .skip(Number(page))
            .limit(Number(limit))
    ]);

    res.json({
        total,
        products
    }); 
}

//Obtener Producto por ID - populate 
const getProductById = async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById( id )
                            .populate('user', 'name')
                            .populate('category', 'name');
    res.json(product);
}


//Crear producto
const createProduct = async ( req, res ) => {
    //Leemos el nombre que viene en el body y lo pasamos a mayuscula
    const { status, user, ...body } = req.body; 
    
    //Pregunto si existe un categoria con ese nombre
    const productDB = await Product.findOne({ name: body.name });

    //Si existe, notifico el error para evitar el duplicado
    if ( productDB ) {
        return res.status(400).json({
            mgs: `El producto ${productDB.name}, ya existe`
        })
    }

    //Caso contrario genero la data para guardar
    const data = {
        ...body,
        name: body.name.toUpperCase(),
        user: req.user._id
    }

    const product = new Product(data);

    //Guardar en DB
    await product.save();

    res.status(201).json(product);

}

//Actualizar Producto
const updateProduct = async ( req, res ) => {
    const { id } = req.params;
    const { status, user, ...data } = req.body;

    if ( data.name ) {
        data.name = data.name.toUpperCase();
    }
    
    data.user = req.user._id;

    const product = await Product.findByIdAndUpdate(id,  data, { new: true });

    res.json(product);
}

//Eliminar Product
const deleteProduct = async ( req, res ) => {
    const { id } = req.params;
    const removeProduct = await Product.findByIdAndUpdate(id, { status: false }, { new: true });

    res.json(removeProduct);
}

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
}