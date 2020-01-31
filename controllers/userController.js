
var User = require("../models/user");
var Event = require("../models/event");
module.exports = {
    signup: signup,
    signin: signin,
    createEvent: createEvent,
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
      username: req.body.username
    }, function(err, user) {
      if (err) throw err;
  
      if (!user) {
        res.status(401).send({success: false, msg: 'Authentication failed. User not found.'});
      } else {
        // check if password matches
        user.comparePassword(req.body.password, function (err, isMatch) {
          if (isMatch && !err) {
            // if user is found and password is right create a token
            var token = jwt.sign(user, config.secret);
            // return the information including token as JSON
            res.json({success: true, token: 'JWT ' + token});
          } else {
            res.status(401).send({success: false, msg: 'Authentication failed. Wrong password.'});
          }
        });
      }
    });
  };
 async function createEvent(req, res) {
    // if (!req.body.username || !req.body.password) {
    //   res.json({success: false, msg: 'Please pass username and password.'});
    // } else {
      let sday= req.body.startModel["day"];
      let smonth =   req.body.startModel["month"];
       let syear = req.body.startModel['year'];

       let eday= req.body.endModel["day"];
       let emonth =   req.body.endModel["month"];
        let eyear = req.body.endModel['year'];

      var newEvent = new Event(req.body);
      // save the event
      await newEvent.save(function(err) {
        if (err) {
          return res.json({success: false, msg: 'Event already exists.'});
        }else{
          res.json({success: true, msg: 'Successful created new event.'});
        }
      }); 
  //  }
  };