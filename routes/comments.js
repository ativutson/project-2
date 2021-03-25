const express = require("express");
const router = express.Router();
const commentsCtrl = require("../controllers/comments");

router.post("/blogs/:id/comments", commentsCtrl.create);
router.delete("/comments/:id", commentsCtrl.delete);
router.put("/comments/:id/edit", commentsCtrl.update);
router.get("/comments/:id/edit", commentsCtrl.newEdit);



module.exports = router;
