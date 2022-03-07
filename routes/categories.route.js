const { Router } = require('express');
const { check } = require('express-validator');
const { createCategory, getAllCategories, getCategoryById, updateCategory, deleteCategory } = require('../controllers/categories.controller');
const { validateCategoryById } = require('../helpers/db-validators');

const { validateFields, validationJwt, validationRole } = require('../middlewares');


const router = Router();

// Obtener todas las categorias - publico
router.get('/', getAllCategories);

// Obtener una de las categorias - publico
router.get('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(validateCategoryById),
    validateFields
],getCategoryById);

// Crear una categoria - privado (Cualquier persona con token valido)
router.post('/', [
    validationJwt, 
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    validateFields
    
], createCategory);

// Actualizar una categoria - privado (Cualquier persona con token valido)
router.put('/:id', [
    validationJwt,
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('category', 'No es un Id de Mongo').isMongoId(),
    check('id').custom(validateCategoryById),
    validateFields
], updateCategory);

// Borrar una categoria - privado (Usuario Admin)
router.delete('/:id', [
    validationJwt,
    validationRole,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(validateCategoryById),
    validateFields
], deleteCategory);



module.exports = router;
