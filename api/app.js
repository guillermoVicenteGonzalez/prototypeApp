const express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    methodOverride  = require("method-override"),
    mongoose        = require('mongoose'),
    cors            = require("cors");
    config          = require("./config.json");


const puerto = config.port;
const mongoUrl = config.mongoUrl;

//documentacion
const expressSwagger = require('express-swagger-generator')(app);
let options = {
    swaggerDefinition: {
        info: {
            description: 'This is a sample server',
            title: 'Swagger',
            version: '1.0.0',
        },
        host: 'localhost:3000',
        basePath: '/v1',
        produces: [
            "application/json",
            "application/xml"
        ],
        schemes: ['http', 'https'],
        securityDefinitions: {
            JWT: {
                type: 'apiKey',
                in: 'header',
                name: 'Authorization',
                description: "",
            }
        }
    },
    //basedir: __dirname, //app absolute path
    basedir: "./",
    //files: ['./controllers/usuariosCtrl.js'] //Path to the API handle folder
    files: ['./models/user.js', './controllers/usersCtrl.js']
};
expressSwagger(options)


//modelo y controlador de peliculas
const TVShowModel = require("./models/tvshow");
const TVShowCtrl = require('./controllers/tvshows');

//modelo y controlador de usuarios
const usuarioModel = require("./models/user");
const usuarioCtrl = require("./controllers/usersCtrl");

const router = require("./routes/index");

//conexion a la BD
mongoose.connect(mongoUrl, function(err, res) {
  if(err) throw err;
  console.log('Connected to Database');
});


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());

app.use(cors());
app.use("/api", router);
// Start server
app.listen(puerto, function() {
  console.log("Node server running on http://localhost:" + puerto);
});