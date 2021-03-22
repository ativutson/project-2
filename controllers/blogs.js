const Blog = require('../models/blog');



function index(req, res) {
  res.render("blogs/index", { content: 'All Blogs' });
}



module.exports = {
  index,
  
};