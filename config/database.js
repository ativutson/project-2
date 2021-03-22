const mongoose = require("mongoose");

mongoose.connect('mongodb+srv://admin:az444000@cluster0.uzky1.mongodb.net/my-blogs?retryWrites=true&w=majority', {

    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  }
);

// shortcut to mongoose.connection object
const db = mongoose.connection;

db.on("connected", () => {
  console.log(`Connected to MongoDB at ${db.host}:${db.port}`);
});
