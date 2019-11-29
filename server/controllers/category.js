const Category = require('../db/models/Category'),
      MyError = require('../middleware/MyError'),
      ctr = {};

ctr.findAllFromUser = () => async (req,res,next) => {
  const { userId } = req.params;
  const categories = await Category.findByUser(userId)
  
  return res.status(200).json({categories});
}

ctr.findOneFromUser = () => async (req,res,next) => {
  const { userId, categoryId } = req.params;
  const category = await Category.findOneFromUser(categoryId, userId);
  if(!category) return Promise.reject(new MyError(404, "Category not found"));
  return res.status(200).json({category});
}

ctr.create = () => async (req,res,next) => {
  const { userId } = req.params;
  const { name } = req.body;

  let category = new Category({name, owner: userId})

  await category.save();

  return res.status(201).json({category});
}

ctr.edit = () => async (req,res,next) => {
  const { userId, categoryId } = req.params;
  const { name } = req.body;
  const category = await Category.findOneFromUser(categoryId, userId);

  if(!category) return Promise.reject(new MyError(404, "Category not found"));

  category.name = name;

  await category.save();

  return res.status(201).json({category});
}

ctr.delete = () => async (req,res,next) => {
  const { userId, categoryId } = req.params;
  
  const category = await Category.removeCategoryCascade(categoryId, userId);

  return res.status(201).json({category});
}

module.exports = ctr;