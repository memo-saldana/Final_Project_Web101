const mongoose = require('mongoose');

let categorySchema = new mongoose.Schema({
  name: {
    type: String
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})

module.exports = mongoose.model('Category',categorySchema);