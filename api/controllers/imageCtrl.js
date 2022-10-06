const mongoose = require("mongoose");
const imageModel = require("../models/image")

exports.uploadImage = async function(req,res){
    try{
        if(!req.file){

        }else{

        }
    }catch{
        res.status(500).json({success:false, message:"server error"})
    }
}