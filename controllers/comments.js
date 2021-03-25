const Blog = require("../models/blog");

function create(req, res) {
  Blog.findById(req.params.id, (err, blog) => {
    blog.comments.push(req.body);
    blog.save((err) => {
      res.redirect(`/blogs/${blog._id}`);
    });
  });
}

function deleteComment(req, res) {
  Blog.findOne({ "comments._id": req.params.id }, function (err, blog) {
    blog.comments.pull(req.params.id);
    blog.save((err) => {
      res.redirect(`/blogs/${blog._id}`);
    });
  });
}

function update(req, res) {
  Blog.findOne({ "comments._id": req.params.id }, function(err, blog) {
  // use the mongoose id method to assign an in-memory reference to the subdocument by it's id
  const subDocument = blog.comments.id(req.params.id);
  // use the mongoose overwrite method to update field values
  subDocument.overwrite(req.body);
  // save the parent document
    blog.save(function(err) {
   // error handling and/or redirect somewhere
    res.redirect(`/blogs/${blog._id}`)
  });
});
}

function newEdit(req, res) {
  res.render("blogs/edit");
}





module.exports = {
  create,
  delete: deleteComment,
  update,
  newEdit,
};