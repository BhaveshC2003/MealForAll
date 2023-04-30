const express = require('express');
const { newOrder, getSingleOrder, myOrders, getAllOrders, updateOrder, deleteOrder, scheduledPickup } = require('../controllers/orderController');
const router = express.Router();
const {isAuthenticatedUser, isAuthorized} = require('../middleware/auth');

router.route('/order/new').post(isAuthenticatedUser,newOrder)
router.route("/order/pickup").post(isAuthenticatedUser,scheduledPickup)
router.route('/order/:id').get(isAuthenticatedUser,getSingleOrder);
router.route('/orders/me').get(isAuthenticatedUser,myOrders);
router.route('/admin/orders').get(isAuthenticatedUser,isAuthorized,getAllOrders);
router.route('/admin/order/:id')
.put(isAuthenticatedUser,isAuthorized,updateOrder)
.delete(isAuthenticatedUser,isAuthorized,deleteOrder);

module.exports = router;