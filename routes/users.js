var express = require('express');
var router = express.Router();
var passport = require('passport');
require('../config/passport')(passport);
var userController = require('../controllers/userController');


router.post('/signup',   userController.signup);
router.post('/signin',   userController.signin);
router.post('/createEvent',passport.authenticate('jwt', { session: false}),   userController.createEvent);
router.post('/updateProfile', passport.authenticate('jwt', { session: false}),  userController.updateProfile);
router.get('/getEvents', passport.authenticate('jwt', { session: false}),  userController.getEvents);
router.get('/getUsers', passport.authenticate('jwt', { session: false}),  userController.getUsers);
router.put('/deactiveUser', passport.authenticate('jwt', { session: false}),  userController.deactiveUser);


module.exports = router;