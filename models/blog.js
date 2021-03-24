const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema(
    {
        content: String
    }
);

const blogSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    content: String,
    comments: [commentSchema]
});




module.exports = mongoose.model("Blog", blogSchema);
