const { Router } = require('express');
const { check } = require('express-validator');
const { uploadFile } = require('../controllers/uploads.controller');

const { validateFields } = require('../middlewares/validator-users');


const router = Router();

router.post('/', uploadFile);


module.exports = router;