const mongoose = require("mongoose");
const imageModel = require("../models/image")
const multer = require("multer");
const fs = require("fs");
const path = require('path');

var storage = multer.diskStorage({
    /*
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
    */
   destination:'uploads',
   filename:(req,file,cb) =>{
    cb(null,Date.now + file.originalname);
   },
});
var upload = multer({ storage: storage }).single("profileImage");

exports.uploadImage = async function(req,res){
    upload(req,res,(err)=>{
        if(err){
            //console.log(err);
            res.status(400).json({success:false, message:err});
        }else{
            const newImage = new imageModel({
                name: req.body.name,
                image:{
                    data:req.file.filename,
                    contentType:'image/png'
                }
            })
            newImage.save()
            .then(function(response){
                console.log("acierto");
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
    let temp = "/uploads/function now() { [native code] }";
    let filename = "temp.png"
    let photo = await imageModel.findById(req.params.id).catch(err => {return undefined});
    if(photo){
        console.log(photo);
        let path = temp + photo.name;
        fs.writeFile(filename,path,'base64',()=>{
            //let full_path = path.resolve("./") + "/" + filename;
            res.status(200).sendFile("/" + filename,{root: '.'});
        })
        //res.json({success:true,photo});
        //this is temporary
        //res.sendFile("/uploads/function now() { [native code] }" + photo.name,{root: '.'});
    }else{
        res.status(400).json({success:false, message:"error"});
    }
}



