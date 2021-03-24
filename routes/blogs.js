const express = require('express');
const router = express.Router();
const blogsCtrl = require('../controllers/blogs');

router.get("/", blogsCtrl.index);
router.get("/new", blogsCtrl.new);
router.get('/:id', blogsCtrl.show);
router.post("/", blogsCtrl.create);

module.exports = router;
