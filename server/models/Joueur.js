const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name: String,
    position: String,
    number: Number
})

const UserModel = mongoose.model("joueurs", UserSchema)
module.exports = UserModel