const express = require('express');
const {registerUser, loginUser, logoutUser, forgotPassword, resetPassword, getUserDetails,
     updatePassword, updateProfile, getAllUsers, getSingleUser, updateUser, deleteUser} = require('../controllers/userController');
const { isAuthenticatedUser, isAuthorized } = require('../middleware/auth');

const router = express.Router();

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/password/forgot').post(forgotPassword);
router.route('/password/forgot/:token').put(resetPassword);
router.route('/logout').get(logoutUser);

router.route('/me').get(isAuthenticatedUser,getUserDetails);
router.route('/password/update').put(isAuthenticatedUser,updatePassword);
router.route('/me/update').put(isAuthenticatedUser,updateProfile);


//Admin Routes
router.route('/admin/users').get(isAuthenticatedUser,isAuthorized,getAllUsers);
router.route('/admin/user/:id')
.get(isAuthenticatedUser,isAuthorized,getSingleUser)
.put(isAuthenticatedUser,isAuthorized,updateUser)
.delete(isAuthenticatedUser,isAuthorized,deleteUser);
module.exports = router;