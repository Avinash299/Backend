var express = require('express');
var router = express.Router();
var passport = require('passport');
require('../config/passport')(passport);
var userController = require('../controllers/userController');


router.post('/signup',   userController.signup);
router.post('/signin',   userController.signin);
router.post('/createEvent',   userController.createEvent);

// router.post('/', passport.authenticate('jwt', { session: false}),  userController.addOrUpdateAction);

module.exports = router;