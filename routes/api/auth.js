//const mongoose = require('mongoose');
const passport = require('passport');
const settings = require('../../config/settings');
const auth = require('../../config/passport');
const router = require('express').Router();
const jwt = require('jsonwebtoken');
const User = require('../../models/user');

auth(passport);

router.post('/register', (req, res) => {
  if(!req.body.username || !req.body.password){
    res.json({success: false, msg: 'Please enter both a username and a password.'})
  } else {
    const newUser = new User({
      username: req.body.username,
      password: req.body.password
    });
    newUser.save((err) => {
      if (err) {
        return res.json({success: false, msg: "This username already exists."})
      } else {
        genToken(req, res)
      }
    });
  }
});

router.post('/login', genToken)

function genToken(req, res){
  User.findOne({
    username: req.body.username
  }, (err, user) => {
    if (err) throw err;

    if (!user) {
      res.status(401).send({status: false, msg: 'This username cannot be found.'})
    } else {
      user.comparePassword(req.body.password, (err, isMatch) => {
        if (isMatch && !err) {
          const token = jwt.sign(user.toJSON() , settings.secret)
          res.json({success: true, token: 'JWT' + token})
        } else {
          res.status(401).send({success: false, msg: 'Incorrect password. Try again.'})
        }
      })
    }
  });
};

module.exports = router;