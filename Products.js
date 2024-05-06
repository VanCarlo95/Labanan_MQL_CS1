const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  role: String,
  username: String,
  password: String
})

const ProdModel = mongoose.model("cs1Prod", UserSchema)

module.exports = ProdModel