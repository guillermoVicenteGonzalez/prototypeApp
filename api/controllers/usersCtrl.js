//imports
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const userModel = require("../models/user");

//variables y constantes
const saltRounds = 10 


/**
 * This function allow the user to login in the system by providing his username and password and returns a jwt
 * @route POST /api/users/login
 * @group Usuario - User operations
 * @param {User.model} body.body.required - the user's to be logged on data 
 * @returns {json} 201 - returns a jwt for furhter  authentication
 * @returns {json} 4xx -success:false, message: a message detailing the error
 */
exports.userLogin = async function(req, res){
    //primero verifico que la request esta bien hecha.
    if(req.body.login === '' || req.body.password === '' || req.body.login == undefined || req.body.password == undefined ){
        res.status(400).json({success:false, message:"some of the request's fields where empty"})
    }else{
        let myUser = await User.findOne({login:req.body.login});
        if(myUser){
            //el usuario existe, compruebo su contraseña
            let comparePasswd = await bcrypt.compare(req.body.password, myUser.password).catch(err => {return undefined});
            if(comparePasswd){
                //la contraseña es correcta. Genero el token y lo devuelvo
                let token = await jwt.sign({
                    data: myUser.login,
                    exp: Math.floor(Date.now()/1000) + (60 * 60)
                },"secret");
                console.log("correct token. Succesfull login");
                res.status(201).json({success: true, token})
            }else{
                //la contraseña es distinta
                res.status(401).json({success:false, message:"wrong password"});
            }
        }else{
            //el usuario no existe
            res.status(404).json({success:false, message:"username does not exist"});
        }
    }
}


/**
 * This function allows a user to register in the system by providing a username and a password
 * @route POST /api/users
 * @group Usuario - User operations
 * @param {User.model} body.body.required -the user's to be registered data
 * @returns {User.model} 201 - returns registered user's data in json format
 * @returns {Error} 4xx -success:false, message:"a message detailing the error"
 */
exports.userRegister = async function(req, res){
    console.log(req.body);

    if(req.body.login == undefined || req.body.password == undefined || req.body.login === '' || req.body.password === ''){
        res.status(400).json({success:false, message:"you have to fill all the required fields"});
        console.log("missing fields");
    }else{
        let userExists = await User.findOne({login:req.body.login});
        if(userExists){
            console.log("user is alredy registered");
            res.status(403).json({success:false, message:"user alredy registered"});
        }else{
            let encriptedPasswd = await bcrypt.hash(req.body.password, saltRounds).catch(err => {return undefined});
            let nUser = new User({
                login: req.body.login,
                password: encriptedPasswd
            });
            let result = await nUser.save().catch(err => {return undefined});
            if(result){
                res.status(201).json({success:true, result});
                console.log("exito" + result);
            }else{
                console.log("error " + result);
                res.status(400).json({success:false, result});
            }
            console.log(nUser);
        }
    }
}


/**
 * This function allows a logged user to consult his data. He needs to pass a valid jwt through authorization header
 * The Jwt can be aquired through login: GET /api/tvshows
 * @route GET /api/users/:login
 * @group Usuario - User operations
 * @security JWT
 * @returns {json} 200 - returns the data corresponding to the user with the :id in JSON format
 * @returns {Error} 400 - either the id or the jwt are not valid
 */
exports.getUserData = async function(req, res){
    //let user = await User.findById(req.params.id).catch(err => {return undefined});
    let user = await User.findOne({login:req.params.login}).catch(err =>{return undefined});
    let authorizationHeader = req.headers.authorization;
    if(user && authorizationHeader){
        let token = authorizationHeader.split(' ');
        console.log(token[1]);

        try{
            var decoded = jwt.verify(token[1], 'secret');
            if(decoded){
                res.status(200).json({succes:true, user}); 
            }else{
                res.status(400).json({successs:false,message:"invalid token"});
            }
    
        }catch(err){
            res.status(400).json({successs:false,message:"invalid token"});
        };
        
    }else{
        console.log("error");
        res.status(400).json({success:false, message:"either user id or jwt format is invalid"});
    }
}
