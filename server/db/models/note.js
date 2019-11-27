const mongoose = require('mongoose');

let noteSchema = new mongoose.Schema({
  title: {
    type: String
  },
  text: {
    type: String
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category'
  }
})

module.exports = mongoose.model('Note',noteSchema);