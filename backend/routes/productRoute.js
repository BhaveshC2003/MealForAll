const express = require('express');
const app = require('../app');
const { getAllProducts,createProduct, updateProduct, deleteProduct, 
    getProductDetails, createProductReview, getAllReviews, deleteReview, getAdminProducts } = require('../controllers/productController');
const {isAuthenticatedUser,isAuthorized} = require('../middleware/auth');
const router = express.Router();

//Routes
router.route('/products').get(getAllProducts);
router.route('/admin/products').get(isAuthenticatedUser,isAuthorized,getAdminProducts)
router.route('/admin/product/new').post(isAuthenticatedUser,isAuthorized,createProduct);
router.route('/admin/product/:id').put(isAuthenticatedUser,isAuthorized,updateProduct);
router.route('/admin/product/:id').delete(isAuthenticatedUser,isAuthorized,deleteProduct);
router.route('/product/:id').get(isAuthenticatedUser,getProductDetails);
router.route('/review').put(isAuthenticatedUser,createProductReview);
router.route('/reviews')
.get(getAllReviews)
.delete(isAuthenticatedUser,deleteReview)

module.exports = router;