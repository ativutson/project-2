const Blog = require('../models/blog');

function index(req, res) {
  Blog.find({}, (err, blogs) => {
    res.render("blogs/index", { blogs });
  });
}

function newBlog(req, res) {
  res.render("blogs/new");
}

function show(req, res) {
  Blog.findById(req.params.id, (err, blog) => {
    res.render("blogs/show", { blog });
  });
}

function create(req, res) {
  // remove empty/blank inputs from req.body
  for (let key in req.body) {
    if (req.body[key] === '') delete req.body[key];
  }

  Blog.create(req.body, (err, blog) => {
    // one way to handle errors
    if (err) return res.redirect('/blogs/new');
    // for now, redirect right back to the "new" view
    res.redirect('/blogs');
  });
}




module.exports = {
  index,
  new: newBlog,
  show,
  create,
};