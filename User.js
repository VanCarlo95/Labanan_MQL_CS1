const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  role: String,
  username: String,
  password: String
})

const UserModel = mongoose.model("cs1Users", UserSchema)

module.exports = UserModel