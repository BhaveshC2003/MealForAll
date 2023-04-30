const {isAuthenticatedUser} = require('../middleware/auth')
const express = require('express')
const { processPayment, getStripeApiKey } = require('../controllers/paymentController')
const router = express.Router()

router.route('/payment/process').post(isAuthenticatedUser,processPayment)
router.route('/stripeapikey').get(isAuthenticatedUser,getStripeApiKey)

module.exports = router