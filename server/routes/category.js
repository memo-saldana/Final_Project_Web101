const express = require("express"),
      router = express.Router({mergeParams: true}),
      aHandler = require('express-async-handler'),
      catCtr = require('../controllers/category');

// FIND ALL
router.get('/', aHandler(catCtr.findAllFromUser()));

// FIND ONE
router.get('/:categoryId', aHandler(catCtr.findOneFromUser()));

// CREATE
router.post('/', aHandler(catCtr.create()));

// UPDATE
router.put('/:categoryId', aHandler(catCtr.edit()));

// DELETE
router.delete('/:categoryId', aHandler(catCtr.delete()));

module.exports = router;