
var User = require("../models/user");
var config = require("../config/database");
var jwt = require('jsonwebtoken');

module.exports = {
    signup: signup,
    signin: signin,
    updateProfile: updateProfile,
}

function signup(req, res) {
    if (!req.body.username || !req.body.password) {
      res.json({success: false, msg: 'Please pass username and password.'});
    } else {
      var newUser = new User(req.body);
      // save the user
      newUser.save(function(err) {
        if (err) {
          return res.json({success: false, msg: 'Username already exists.'});
        }else{
          res.json({success: true, msg: 'Successful created new user.'});
        }
      }); 
    }
  };

function signin(req, res) {
    User.findOne({
      email: req.body.email
    }, function(err, user) {
      if (err) throw err;
  
      if (!user) {
        res.status(401).send({success: false, msg: 'Authentication failed. User not found.'});
      } else {
        // check if password matches
        user.comparePassword(req.body.password, function (err, isMatch) {
          if (isMatch && !err) {
            let userData={
              username:user.username,
              email:user.email,
              aboutMe:user.aboutMe,
              address:user.address,
              terms:user.terms,
              age:user.age,
              firstName:user.firstName,
              lastName:user.lastName,
              mobileNo:user.mobileNo,
              role:user.role,
            }
            let userInfo=JSON.parse(JSON.stringify(user));
            var token = jwt.sign(userInfo, config.secret, {
              expiresIn: 604800 // 1 week
            });
            // return the information including token as JSON
            res.json({success: true, data:userData, token: 'JWT ' + token,msg:"Login successfully."});
          } else {
            res.status(401).send({success: false, msg: 'Authentication failed. Wrong password.'});
          }
        });
      }
    });
  };
  function updateProfile(req, res) {
    if (!req.body.username || !req.body.email) {
      res.json({success: false, msg: 'Please pass username and email.'});
    } else {
      // update the user
      let updateInfo={
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        address:req.body.address,
        aboutMe:req.body.aboutMe
      }
      User.update({username:req.body.username,email:req.body.email},{"$set":updateInfo},function(err) {
        if (err) {
          return res.json({success: false, msg: 'Profile updation failed.'});
        }else{
          res.json({success: true,data:updateInfo,  msg: 'Successful updated profile.'});
        }
      }); 
    }
  };