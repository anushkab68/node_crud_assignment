const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name:String,
  age:Number,
  gender:String,
  phone:Number
});

const User = mongoose.model("User", UserSchema);

module.exports = User;