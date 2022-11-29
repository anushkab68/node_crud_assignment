var express = require('express');
var usersRouter = require('./routes/users');
var app = express();
const mongoose = require("mongoose");
app.use(express.json());
mongoose.connect('mongodb://localhost:27017/crud_db',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});
app.listen(4000, () => {
  console.log("Server is running at port 4000");
});

app.use('/users', usersRouter);

module.exports = app;
