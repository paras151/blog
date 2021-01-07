var userModel = require('./../model/userModel');
const jwt = require('jsonwebtoken');

var authenticate = (req, res, next) => {
  var token = req.header('x-auth');

  token = req.cookies.jwt;
  // console.log(req.cookies.jwt)


  userModel.findByToken(token).then((user) => {
    if (!user) {
      return Promise.reject();
    }

    req.user = user;
    req.token = token;

    next();
  }).catch((e) => {
    res.redirect("/users/login")
  });
};

module.exports = {authenticate};
