/**
 * @typedef Usuario
 * @property {String} login.required - user login name
 * @property {string} password.required - user password
 */


const mongoose = require("mongoose");
const usuarioSchema = new mongoose.Schema(
    {
        login: {type:String, unique:true},
        password:{type:String}
    }
)

const usuarioModel = mongoose.model("usuario",usuarioSchema);
module.exports = usuarioModel;