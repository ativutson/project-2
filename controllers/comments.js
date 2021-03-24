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
  Blog.findById(req.params.id, (err, blog) => {
    blog.comments.
   
    blog.save((err) => {
      res.redirect(`blogs/${blog._id}`);
    });
  });
}



module.exports = {
  create,
  delete: deleteComment,
  
};