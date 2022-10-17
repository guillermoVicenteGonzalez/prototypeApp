const mongoose = require("mongoose");
const imageModel = require("../models/image")
const multer = require("multer");
const fs = require("fs");
const path = require('node:path');

/*
var storage = multer.diskStorage({
    /*
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
    
   destination:'uploads',
   filename:(req,file,cb) =>{
    cb(null,Date.now + file.originalname);
   },
});
*/

var storage = multer.memoryStorage()

var upload = multer({ storage: storage }).single("profileImage");

exports.uploadImage = async function(req,res){
    upload(req,res,(err)=>{
        if(err){
            //console.log(err);
            res.status(400).json({success:false, message:err});
        }else{
            //console.log("Entra, ", req.file)
            const newImage = new imageModel({
                name: req.body.name,
                image:{
                    data:req.file.buffer.toString('base64'),
                    contentType:'image/png'
                }
            })
            newImage.save()
            .then(function(response){
                console.log("uploaded image successfully");
                res.status(200).json({success:true, id:newImage._id});
                console.log(newImage._id);
            })
            .catch(function(error){
                res.status(400).json({success:false, message:"error"});
            });
        }
    })
}

exports.getUploadedImage = async function(req,res){
    let photo = await imageModel.findById(req.params.id).catch(err => {return undefined});
    if(photo){
        let filename = photo.name || "temp.png"
        let path1 = photo.image.data;

        fs.writeFile(filename,path1,'base64',()=>{
            var full_path = path.resolve("./") + "/" + filename;
            res.status(200).sendFile(full_path)
            //fs.unlinkSync(full_path);
        })
    }else{
        console.log("error getting image. Could not find id");
        res.status(400).json({success:false, message:"error"});
    }
}



