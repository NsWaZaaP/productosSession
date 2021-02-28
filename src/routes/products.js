// ************ Require's ************
const express = require('express');
const router = express.Router();
const multer = require ('multer');
const path = require('path');
const {body} = require ('express-validator');

// ************ Express Validator ************

const validaciones= [
    body('name').notEmpty().withMessage('Debes completar el campo de nombre'),
    body('price').notEmpty().withMessage('Debes completar el campo de precio'),
    body('discount').notEmpty().withMessage('Debes completar el campo de descuento'),
    body('description').notEmpty().withMessage('Debes completar el campo de descripción'),
    body('category').notEmpty().withMessage('Debes seleccionar una categoria')
]

// ************ Multer Configuration ************

const storage = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, path.join(__dirname,'../../public/images/products'));
    },
    filename: (req, file, cb) => {
        const newFileName = 'product-' + Date.now() + path.extname(file.originalname);
        cb(null, newFileName);
    }
});

const upload = multer({storage:storage});

//************ Middleware require ************
const logMiddleware = require ('../middlewares/logMiddleware');



//************ Controller Require ************
const productsController = require('../controllers/productsController');

/*** GET ALL PRODUCTS ***/ 
router.get('/', productsController.index); 

/*** CREATE ONE PRODUCT ***/ 
router.get('/create', productsController.create); 
router.post('/create', upload.single('image'),logMiddleware,validaciones,productsController.store); 


/*** GET ONE PRODUCT ***/ 
router.get('/:id/', productsController.detail); 

/*** EDIT ONE PRODUCT ***/ 
router.get('/edit/:id', productsController.edit); 
router.put('/edit/:id', upload.single('image') ,productsController.update); 


/*** DELETE ONE PRODUCT***/ 
router.delete('/edit/:id', productsController.destroy); 


module.exports = router;
