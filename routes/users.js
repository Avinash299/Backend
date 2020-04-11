var express = require('express');
var router = express.Router();
var passport = require('passport');
require('../config/passport')(passport);
var userController = require('../controllers/userController');


router.post('/signup',   userController.signup);
router.post('/login',   userController.login);
router.post('/updateProfile', passport.authenticate('jwt', { session: false}),  userController.updateProfile);
router.get('/getUsers', passport.authenticate('jwt', { session: false}),  userController.getUsers);
router.put('/deactiveUser', passport.authenticate('jwt', { session: false}),  userController.deactiveUser);


module.exports = router;