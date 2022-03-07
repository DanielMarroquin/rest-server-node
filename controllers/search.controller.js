const { ObjectId } = require('mongoose').Types;
const { User, Category, Product } = require ('../models')


const collectionsAllowed = [
    'users',
    'categories',
    'products',
    'roles'
];

const searchUser = async( match = '', res) => {
    const isMongoId = ObjectId.isValid (match); // Se genera la busqueda por ID Mongo

    if (isMongoId) {
        const user = await User.findById(match);
        return res.json({
            //Utilizo un operador ternario para validar el ID de usuario
            results: ( user ) ? [ user ] : []
            //Si el usuario existe, voy a retornar el arreglo con los datos del usuarios [ user ]
            //Caso contratio retorno un arreglo vacio []
        })
    }

    //Se declara una expresion regular 
    const regex = new RegExp( match, 'i' );

    const usersName = await User.find({
        //Combino las propiedades find con una expresion regular
        //Para poder añadir diferentes terminos de busqueda que coincida con la expresion regular
        $or: [{ name: regex, status: true }, { email: regex }],
        $and: [{ status: true }]
     });

    res.json({
        results: usersName
    })
}

const searchCategory = async ( match = '', res ) => {
    const isMongoId = ObjectId.isValid (match); // Se genera la busqueda por ID Mongo

    if (isMongoId) {
        const category = await Category.findById(match);
        return res.json({
            results: ( category ) ? [ category ] : []
        })
    }

    const regex = new RegExp( match, 'i' );

    const categoriesName = await Category.find({ name: regex, status: true });

    res.json({
        results: categoriesName
    })
}

const searchProducts = async( match = '', res) => {
    const isMongoId = ObjectId.isValid (match); // Se genera la busqueda por ID Mongo

    if (isMongoId) {
        const product = await Product.findById(match).populate('category', 'name');
        return res.json({
            results: ( product ) ? [ product ] : []
        })
    }

    //Se declara una expresion regular 
    const regex = new RegExp( match, 'i' );

    const productsName = await Product.find({ name: regex, status: true }).populate('category', 'name');

    res.json({
        results: productsName
    })
}


const searchElement = ( req, res ) => {

    const { collection, match } = req.params;

    if ( !collectionsAllowed.includes(collection)) {
        return res.status(400).json({
            msg: `Las colecciones permitidas son: ${collectionsAllowed}`
        })
    }


    switch (collection) {
        case 'users':
            searchUser(match, res);
        break;
        case 'categories':
            searchCategory(match, res);
        break;
        case 'products':
            searchProducts(match, res);
        break;
        default:
            res.status(500).json({
                msg: 'Busqueda no implementada en backend'
            })
    }

}




module.exports = { 
    searchElement
}