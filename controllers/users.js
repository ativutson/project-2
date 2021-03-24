const bcrypt = require('bcrypt');
const User = require('../models/user');
const SALT_ROUNDS = 10;


function newUser(req, res) {
  res.render("users/new");
}

function signup(req, res) {
  // salt & hash password
  req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(SALT_ROUNDS));
  // assign that value to req.body.password
  // create the user document and save to the users collection - Model.create()
  User.create(req.body, function(err, newUser) {
    console.log(newUser);
    res.redirect('/');
  });
}


function signin(req, res) {
  res.render('users/login');
}


function login(req, res) {
  // look up the user by the username
  User.findOne({ 
    username: req.body.username 
  }, function(err, foundUser) {
    // if user not found -> respond with message saying bad credentials
    if(foundUser === null) {
      res.redirect('/users/signin');
    } else {
      // if user found -> compare passwords
      const doesPasswordMatch = bcrypt.compareSync(req.body.password, foundUser.password)
      // if password matches -> create a session using the userId
      if(doesPasswordMatch) {
        req.session.userId = foundUser._id;
        res.redirect('/users/dashboard');
      } else {
        // if password does not match -> respond with message saying bad credentials
        res.redirect('/users/signin');
      }
    }
  });
}


function dashboard(req, res) {
  if(req.session.userId) {
    res.render('users/dashboard');
  } else {
    res.redirect('/users/signin');
  }
}

function logout(req, res) {
  req.session.destroy();
  res.redirect('/');
}

module.exports = {
  new: newUser,
  signup,
  signin,
  login,
  dashboard,
  logout,
};