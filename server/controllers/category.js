const Category = require('../db/models/category'),
      Note = require('../db/models/note'),
      MyError = require('../middleware/MyError'),
      ctr = {};

ctr.findAllFromUser = () => async (req,res,next) => {
  const { userId } = req.params;
  const categories = await Category.findByUser(userId);

  return res.status(200).json({categories});
}

ctr.findAllPopulatedFromUser = () => async (req,res,next) => {
  const { userId } = req.params;

  const categories = await Category.findByUser(userId);

  let promises = categories.map( category => {
    return new Promise((resolve, reject) => {
      Note.find({category})
      .then(notes => resolve(notes))
      .catch(err => reject(err))
    });
  })
  let notesArrays = await Promise.all(promises);

  notesArrays.forEach( (notes,i) => {
    categories[i].notes = notes;
  })
  
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
  if(!name || name == "") return Promise.reject(new MyError(400, "Category name not received"));
  let category = new Category({name, owner: userId})

  await category.save();
  category = category.toJSON();
  category.notes = [];
  return res.status(201).json({category});
}

ctr.edit = () => async (req,res,next) => {
  const { userId, categoryId } = req.params;
  const { name } = req.body;
  if(!name || name == "") return Promise.reject(new MyError(400, "Category name not received"));

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