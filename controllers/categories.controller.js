const { response } = require('express');
const { Category } = require('../models');

// const Categories = require('../models/category')

//Obtener Categorias - paginado - total - populate
const getAllCategories = async (req, res) => {

    const { limit=5, page=0 } = req.query;
    const query = { status: true };

    const [ total, categories ] = await Promise.all([
        Category.countDocuments(query),
        Category.find(query)
            .populate('user', 'name')
            .skip(Number(page))
            .limit(Number(limit))
    ]);

    res.json({
        total,
        categories
    }); 
}

//Obtener Categoria por ID - populate 
const getCategoryById = async (req, res) => {
    const { id } = req.params;
    const category = await Category.findById( id ).populate('user', 'name');

    res.json(category);
}

const createCategory = async (req, res = response) => {
    //Leemos el nombre que viene en el body y lo pasamos a mayuscula
    const name = req.body.name.toUpperCase();
    
    //Pregunto si existe un categoria con ese nombre
    const categoryDB = await Category.findOne({name});

    //Si existe, notifico el error para evitar el duplicado
    if ( categoryDB ) {
        return res.status(400).json({
            mgs: `La categoria ${categoryDB.name}, ya existe`
        })
    }

    //Caso contrario genero la data para guardar
    const data = {
        name,
        user: req.user._id
    }

    const category = new Category(data);

    //Guardar en DB
    await category.save();

    res.status(201).json(category);

}

//Actualizar Categoria
const updateCategory = async ( req, res ) => {
    const { id } = req.params;
    const { status, user, ...data } = req.body;
    
    data.name = data.name.toUpperCase();
    data.user = req.user._id;

    const category = await Category.findByIdAndUpdate(id,  data, { new: true });

    res.json(category);
}

//Eliminar Categoria
const deleteCategory = async ( req, res ) => {
    const { id } = req.params;
    const deleteCategory = await Category.findByIdAndUpdate(id, { status: false }, { new: true });

    res.json(deleteCategory);
}

module.exports = {
    getAllCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory
}