/**
 * @typedef User
 * @property {string} login.required - user login name
 * @property {string} password.required - user password
 * @property {string} photo -user photo
 * @property {string} mail
 */


const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
    {
        login: {type:String, unique:true},
        password:{type:String},
        photo:{type:String},
        mail:{type:String, unique:true}
    }
)

const userModel = mongoose.model("user",userSchema);
module.exports = userModel;