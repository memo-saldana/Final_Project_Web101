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
  if(!title || title == "") return Promise.reject(new MyError(400, "Note title not received"));

  let note = new Note({title, text, category: categoryId})
  await note.save();

  return res.status(201).json({note});
}

ctr.edit = () => async (req,res,next) => {
  const { categoryId, noteId } = req.params;
  const { title, text } = req.body;
  if(!title || title == "") return Promise.reject(new MyError(400, "Note title not received"));
  if(!text || text == "") return Promise.reject(new MyError(400, "Note text not received"));

  const note = await Note.findOneFromCategory(noteId, categoryId);
  console.log('note :', note);
  if(!note) return Promise.reject(new MyError(404, "Note not found"));

  note.title = title? title : note.title;
  note.text = text? text : note.text;

  await note.save();

  return res.status(201).json({note});
}

ctr.delete = () => async (req,res,next) => {
  const { categoryId, noteId } = req.params;
  
  const note = await Note.findOneAndRemove({_id:noteId, category: categoryId }).lean().exec();

  return res.status(201).json({note});
}

module.exports = ctr;