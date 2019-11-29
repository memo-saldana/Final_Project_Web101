const mongoose = require('mongoose'),
      MyError = require('../../middleware/MyError');

let categorySchema = new mongoose.Schema({
  name: {
    type: String
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    select: false
  }
})

categorySchema.statics.findByUser = async function(userId) {
  return await this.find({owner: userId}).exec()
}

categorySchema.statics.findOneFromUser = async function(categoryId, userId) {
  return await this.findOne({_id: categoryId, owner: userId}).exec()
}

categorySchema.statics.removeCategoryCascade = async function(categoryId, userId) {
  const category = await this.findOneAndRemove({_id: categoryId, owner: userId}).exec()
  if(!category) return Promise.reject(new MyError(404, "Category not found"));
  // const notes = await mongoose.model('Note').deleteMany({category: categoryId});
  return category
}

module.exports = mongoose.model('Category',categorySchema);