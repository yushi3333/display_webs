const express = require('express');
const {
 
    getAppleProducts,
    getDellProducts,
    getAsusProducts,
    createProductForCategory,
    updateProducts,
    deleteProducts,
    getProductsById,
    
} = require('../controllers/productController');

const router = express.Router();

//CRUD routes for products

router.get('/Apple', getAppleProducts);//get apple
router.get('/Dell',getDellProducts);//get dell
router.get('/Asus', getAsusProducts);
router.post('/:category', createProductForCategory)
router.get('/:category/:id', getProductsById);//get review by id
router.put('/:category/:id', updateProducts);//update
router.delete('/:category/:id', deleteProducts)

module.exports = router;

