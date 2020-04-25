var config = require("../config/database");
var jwt = require('jsonwebtoken');
var User = require("../models/user");
var CryptoJS = require("crypto-js");
const CRYPTO_KEY = 'auth-pass';

module.exports = {
  signup: signup,
  login: login,
  updateUser: updateUser,
  getUsers: getUsers,
  deactiveUser: deactiveUser,
  getUserById: getUserById,
  deleteUser: deleteUser
}


function signup(req, res) {
  if (!req.body.email || !req.body.password) {
    res.json({ success: false, msg: 'Please pass email and password.' });
  } else {
    var newUser = new User(req.body);
    // save the user
    newUser.save(function (err) {
      if (err) {
        return res.json({ success: false, msg: 'Username or email already exists.' });
      } else {
        res.json({ success: true, msg: 'Successful created new user.' });
      }
    });
  }
};

function login(req, res) {
  User.findOne({
    email: req.body.email
  }, function (err, user) {
    if (err) throw err;

    if (!user) {
      res.status(401).send({ success: false, msg: 'Authentication failed. User not found.' });
    } else if (!user.active) {
      res.status(401).send({ success: false, msg: 'Account deactivated.Please contact admin for activation' });
    } else {
      // check if password matches
        if (decrypt(req.body.password) === decrypt(user.password)) {
          let userData = {
            username: user.username,
            email: user.email,
            dob: user.dob,
            mobile: user.mobile,
            role: user.role,
            id:user._id
          }
          let userInfo = JSON.parse(JSON.stringify(user));
          var token = jwt.sign(userInfo, config.secret, {
            expiresIn: 604800 // 1 week
          });
          // return the information including token as JSON
          res.json({ success: true, data: userData, token: 'JWT ' + token, msg: "Login successfully." });
        } else {
          res.status(401).send({ success: false, msg: 'Authentication failed. Wrong password.' });
        }
    }
  });
};

function updateUser(req, res) {
  if (!req.params.id) {
    res.json({ success: false, msg: 'User not found.' });
  } else {
    let updateInfo = {
      username: req.body.username,
      email: req.body.email,
      dob: req.body.dob,
      mobile: req.body.mobile,
      password: req.body.password,
      city: req.body.city,
      state: req.body.state,
      country: req.body.country,
      pin: req.body.pin,
      addressLine1: req.body.addressLine1,
      addressLine2: req.body.addressLine2,
    }
    User.update({ _id: req.params.id }, { "$set": updateInfo }, function (err, result) {
      if (err) {
        return res.json({ success: false, msg: 'User updation failed.' });
      } else {
        res.json({ success: true, data: updateInfo, msg: 'Successful updated user.' });
      }
    });
  }
};


function getUsers(req, res) {
  User.find({}, { username: 1, mobile: 1, dob: 1, email: 1 ,active:1}, function (err, result) {
    if (err) {
      return res.json({ success: false, msg: 'Problem in fetching users.' });
    } else {
      res.json({ success: true, data: result, msg: 'Successful users fetched.' });
    }
  });
}
function deactiveUser(req, res) {
  User.update({ _id: req.params.id }, { "$set": { active: req.params.value } }, function (err) {
    if (err) {
      return res.json({ success: false, msg: 'Updation failed.' });
    } else {
      res.json({ success: true, msg: 'Successfully updated.' });
    }
  });
}
function getUserById(req, res) {
  let id = req.params.id;
  User.findOne({ _id: id }, function (err, result) {
    if (err) {
      return res.json({ success: false, msg: 'Problem in fetching User.' });
    } else {
      res.json({ success: true, data: result, msg: 'Successful user fetched.' });
    }
  });
}

function deleteUser(req, res) {
  User.remove({ _id: req.params.id }, function (err) {
    if (err) {
      return res.json({ success: false, msg: 'Deletion failed.' });
    } else {
      res.json({ success: true, msg: 'Successfully deleted.' });
    }
  });
}
function decrypt(value){
  let bytes  = CryptoJS.AES.decrypt(value, CRYPTO_KEY);
  return bytes.toString(CryptoJS.enc.Utf8);
}