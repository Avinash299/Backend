var express = require('express');
var router = express.Router();
var passport = require('passport');
require('../config/passport')(passport);
var roleController = require('../controllers/roleController');


router.post('/add', passport.authenticate('jwt', { session: false}),  roleController.addRole);
router.get('/get', passport.authenticate('jwt', { session: false}),  roleController.getRole);
router.get('/get/:id', passport.authenticate('jwt', { session: false}),  roleController.getRoleById);


module.exports = router;