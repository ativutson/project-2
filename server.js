const express = require("express");
const morgan = require("morgan");
const port = 8001;
require("./config/database");

const indexRouter = require("./routes/index");
const blogsRouter = require("./routes/blogs");
const commentsRouter = require("./routes/comments");

const app = express();

app.set("view engine", "ejs");

app.use(morgan("dev"));

app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));

//app.use("/", indexRouter);
app.use("/", blogsRouter);
//app.use("/", commentsRouter);

app.listen(port, () => {
  console.log(`Express is listening on port:${port}`);
});
