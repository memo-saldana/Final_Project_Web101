const mongoose = require('mongoose');

let noteSchema = new mongoose.Schema({
  title: {
    type: String
  },
  text: {
    type: String,
    default: ""
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    select: false
  }
})

noteSchema.statics.findAllFromCategory = async function(category) {
  return await this.find({category}).exec();
}


noteSchema.statics.findOneFromCategory = async function(noteId, category) {
  return await this.findOne({_id:noteId, category}).exec();
}


module.exports = mongoose.model('Note',noteSchema);