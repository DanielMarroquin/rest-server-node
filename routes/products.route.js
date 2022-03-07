const { Router } = require('express');
const { check } = require('express-validator');
const { getAllProducts, 
        getProductById, 
        createProduct,
        updateProduct,
        deleteProduct } = require('../controllers/products.controller');
const { validateProductById, validateCategoryById } = require('../helpers/db-validators');

const { validateFields, validationJwt, validationRole } = require('../middlewares');


const router = Router();

// Obtener todas los productos - publico
router.get('/', getAllProducts);

// Obtener uno de los productos - publico
router.get('/:id', [
    check('id', 'No es un ID de Mongo válido').isMongoId(),
    check('id').custom(validateProductById),
    validateFields
],getProductById);

// Crear un producto - privado (Cualquier persona con token valido)
router.post('/', [
    validationJwt, 
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('category', 'No es un Id de Mongo').isMongoId(),
    check('category').custom( validateCategoryById ),
    validateFields
    
], createProduct);

// Actualizar una categoria - privado (Cualquier persona con token valido)
router.put('/:id', [
    validationJwt,
    // check('category', 'No es un Id de Mongo').isMongoId(),
    check('id').custom(validateProductById),
    validateFields
], updateProduct);

// Borrar una categoria - privado (Usuario Admin)
router.delete('/:id', [
    validationJwt,
    validationRole,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(validateProductById),
    validateFields
], deleteProduct);



module.exports = router;
