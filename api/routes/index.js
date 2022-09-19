const{ Router } = require("express");
//const {getAllShows} = require ("../controllers/tvshows");
const TVShowCtrl = require("../controllers/tvshows");
const usuariosCtrl = require("../controllers/usuariosCtrl");

const router = Router();
//entiendo que asi se importan todos, pero no como se asignan a los verbos
//router.get('/tvshows',getAllShows);

//rutas de television
router.route('/tvshows')
  .get(TVShowCtrl.findAllTVShows)
  .post(TVShowCtrl.addTVShow);

router.route('/tvshows/:id')
  .get(TVShowCtrl.findById)
  .put(TVShowCtrl.updateTVShow)
  .delete(TVShowCtrl.deleteTVShow);

router.route("/tvshows/titulo/:title")
  .get(TVShowCtrl.findByName)

//rutas de usuarios
router.route("/usuarios")
  .post(usuariosCtrl.userRegister)
  //.get(usuariosCtrl.userLogin);

router.route("/usuarios/login")
  .post(usuariosCtrl.userLogin)

router.route("/usuarios/:id")
  .get(usuariosCtrl.getUserData);



module.exports = router;
