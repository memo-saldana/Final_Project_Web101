const jwt = require('jsonwebtoken'),
      User = require('../db/models/user'),
      MyError = require('./MyError');

let isLoggedIn = async ( req, res, next ) => {
    const token = req.header('Authorization');
    if(!token) Promise.reject(new MyError(401, "You need to be signed in in order to do that."));
    token = token.replace('Bearer ', '');
    const decoded = jwt.verify(token, secret)
    User.findOne({ _id: decoded._id, tokens: token }).then(function(user) {
      if(!user) {
        throw new Error()
      }
      req.token = token
      req.user = user
      next()
    }).catch(function(error) {
      res.status(401).send({ error: 'Please authenticate'})
    })

}

module.exports = {isLoggedIn};