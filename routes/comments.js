const express = require("express");
const router = express.Router();
const commentsCtrl = require("../controllers/comments");

router.post("/blogs/:id/comments", commentsCtrl.create);
router.delete("/comments/:id", commentsCtrl.delete);
router.put("/blogs/comments/:id", commentsCtrl.update);
router.get("/blogs/:id/comments", commentsCtrl.newEdit);




module.exports = router;
