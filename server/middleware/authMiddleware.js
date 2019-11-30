const jwt = require('jsonwebtoken'),
      User = require('../db/models/user'),
      Category = require('../db/models/category'),
      MyError = require('./MyError');

let isLoggedIn = async ( req, res, next ) => {
  let token = req.header('Authorization');
  if(!token) return Promise.reject(new MyError(401, "Please log in"));
  token = token.replace('Bearer ', '');
  const decoded = jwt.verify(token, process.env.JWT_SECRET)
  const user = await User.findOne({ _id: decoded._id, tokens: token })
  if(!user) return Promise.reject(new MyError(404, "User not found"));
  if(user._id == req.params.userId ){
    req.token = token
    req.user = user
    next()
  }else return Promise.reject(new MyError(401, 'Please log in'));

}

let ownsCategory = async (req,res,next) => {
  const {userId, categoryId} = req.params;
  let token = req.header('Authorization');
  if(!token) return Promise.reject(new MyError(401, "Please log in"));
  token = token.replace('Bearer ', '');
  const decoded = jwt.verify(token, process.env.JWT_SECRET)
  const user = await User.findOne({ _id: decoded._id, tokens: token })
  if(!user) return Promise.reject(new MyError(404, "User not found"));
  const category = await Category.findOneFromUser(categoryId, userId);
  if(!category) return Promise.reject(new MyError(404, "Category not found"));
  if(user._id == req.params.userId){
    req.token = token
    req.user = user
    req.category = category
    next()
  }else return Promise.reject(new MyError(401, 'Please log in'));
    
}

module.exports = {isLoggedIn, ownsCategory};