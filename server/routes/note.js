const express = require("express"),
      router = express.Router({mergeParams: true}),
      aHandler = require('express-async-handler'),
      noteCtr = require('../controllers/note');

// FIND ALL
router.get('/', aHandler(noteCtr.findAllFromCategory()));

// FIND ONE
router.get('/:noteId', aHandler(noteCtr.findOneFromCategory()));

// CREATE
router.post('/', aHandler(noteCtr.create()));

// UPDATE
router.put('/:noteId', aHandler(noteCtr.edit()));

// DELETE
router.delete('/:noteId', aHandler(noteCtr.delete()));

module.exports = router;