/**
 * @typedef User
 * @property {String} login.required - user login name
 * @property {string} password.required - user password
 */


const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
    {
        login: {type:String, unique:true},
        password:{type:String}
    }
)

const userModel = mongoose.model("user",userSchema);
module.exports = userModel;