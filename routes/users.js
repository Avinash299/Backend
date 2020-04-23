var express = require('express');
var router = express.Router();
var passport = require('passport');
require('../config/passport')(passport);
var userController = require('../controllers/userController');


router.post('/signup',   userController.signup);
router.post('/login',   userController.login);
router.put('/update/:id', passport.authenticate('jwt', { session: false}),  userController.updateUser);
router.get('/get/:id', passport.authenticate('jwt', { session: false}),  userController.getUserById);
router.get('/get', passport.authenticate('jwt', { session: false}),  userController.getUsers);
router.get('/active/:id/:value', passport.authenticate('jwt', { session: false}),  userController.deactiveUser);
router.delete('/delete/:id', passport.authenticate('jwt', { session: false}),  userController.deleteUser);


module.exports = router;