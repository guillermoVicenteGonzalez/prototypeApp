//imports
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Usuario = require("../models/usuario");
const jwt = require("jsonwebtoken");
const usuarioModel = require("../models/usuario");

//variables y constantes
const saltRounds = 10 


/**
 * This function allow the user to login in the system by providing his username and password and returns a jwt
 * @route POST /api/usuarios/login
 * @group Usuario - User operations
 * @param {string} login.query.required - username  - eg: user@domain
 * @param {string} password.query.required - user's password.
 * @returns {json} 201 - returns a jwt for furhter  authentication
 * @returns {Error} 404 - Not Found
 */
exports.userLogin = async function(req, res){
    let myUser = await Usuario.findOne({login:req.body.login});
    if(myUser){
        //el usuario existe, compruebo su contraseña
        let comparePasswd = await bcrypt.compare(req.body.password, myUser.password).catch(err => {return undefined});
        if(comparePasswd){
            //la contraseña es correcta. Genero el token y lo devuelvo
            let token = await jwt.sign({
                data: myUser.login,
                exp: Math.floor(Date.now()/1000) + (60 * 60)
            },"secret");
            console.log("correct password. Succesfull login");
            res.status(201).json({success: true, token})
        }else{
            //la contraseña es distinta
            res.status(401).send("password is incorrect");
        }
    }else{
        //el usuario no existe
        res.status(404).send("user does not exist");
    }
}


/**
 * This function allows a user to register in the system by providing a username and a password
 * @route POST /api/usuarios
 * @group Usuario - User operations
 * @param {string} login.query.required - username  - eg: user@domain
 * @param {string} password.query.required - user's password.
 * @returns {json} 201 - returns registered user's data in json format
 * @returns {Error} 400 - The user alredy exists
 */
exports.userRegister = async function(req, res){
    console.log(req.body);
    let userExists = await Usuario.findOne({login:req.body.login});
    if(userExists){
        console.log("user is alredy registered");
        res.status(403).send("user alredy registered");
    }else{
        let encriptedPasswd = await bcrypt.hash(req.body.password, saltRounds).catch(err => {return undefined});
        let nUser = new Usuario({
            login: req.body.login,
            password: encriptedPasswd
        });
        let result = await nUser.save().catch(err => {return undefined});
        if(result){
            res.status(201).json({success:true, result});
        }else{
            res.status(409).send({success:false, result});
        }
        console.log(nUser);
    }
}


/**
 * This function allows a logged user to consult his data. He needs to pass a valid jwt through authorization header
 * The Jwt can be aquired through login: GET /api/tvshows
 * @route GET /api/usuarios/:id
 * @group Usuario - User operations
 * @param {header} token - jwt token 
 * @returns {json} 200 - returns the data corresponding to the user with the :id in JSON format
 * @returns {Error} 400 - either the id or the jwt are not valid
 */
exports.getUserData = async function(req, res){
    let user = await Usuario.findById(req.params.id).catch(err => {return undefined});
    let authorizationHeader = req.headers.authorization;
    if(user && authorizationHeader){
        let token = authorizationHeader.split(' ');
        console.log(token[1]);
        let decoded = jwt.verify(token[1], 'secret');
        if(decoded){
            res.status(200).json({succes:true, user}); 
        }else{
            res.status(400).send("invalid token");
        }

    }else{
        console.log("error");
        res.status(400).send("either user id or jwt format is invalid");
    }
}
