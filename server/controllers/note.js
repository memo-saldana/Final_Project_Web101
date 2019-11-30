const Note = require('../db/models/note'),
      MyError = require('../middleware/MyError'),
      ctr = {};

ctr.findAllFromCategory = () => async (req,res,next) => {
  const { categoryId } = req.params;
  const notes = await Note.findAllFromCategory(categoryId)
  
  return res.status(200).json({notes});
}

ctr.findOneFromCategory = () => async (req,res,next) => {
  const { categoryId, noteId } = req.params;
  const note = await Note.findOneFromCategory(noteId, categoryId);
  if(!note) return Promise.reject(new MyError(404, "Note not found"));
  return res.status(200).json({note});
}

ctr.create = () => async (req,res,next) => {
  const { categoryId } = req.params;
  const { title, text } = req.body;

  let note = new Note({title, text, category: categoryId})

  await note.save();

  return res.status(201).json({note});
}

ctr.edit = () => async (req,res,next) => {
  const { categoryId, noteId } = req.params;
  const { title, text } = req.body;
  const note = await Note.findOneFromCategory(noteId, categoryId);

  if(!note) return Promise.reject(new MyError(404, "Note not found"));

  note.title = title? title : note.title;
  note.text = text? text : note.text;

  await note.save();

  return res.status(201).json({note});
}

ctr.delete = () => async (req,res,next) => {
  const { categoryId, noteId } = req.params;
  
  const note = await Note.remove(noteId, categoryId);

  return res.status(201).json({note});
}

module.exports = ctr;