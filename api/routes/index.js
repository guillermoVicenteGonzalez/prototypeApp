const{ Router } = require("express");
//const {getAllShows} = require ("../controllers/tvshows");
const TVShowCtrl = require("../controllers/tvshows");
const usersCtrl = require("../controllers/usersCtrl");
const imageCtrl = require("../controllers/imageCtrl");

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

router.route("/tvshows/title/:title")
  .get(TVShowCtrl.findByName);

//rutas de usuarios
router.route("/users")
  .post(usersCtrl.userRegister);
  //.get(usuariosCtrl.userLogin);

router.route("/users/login")
  .post(usersCtrl.userLogin);

router.route("/users/:login")
  .get(usersCtrl.getUserData)
  .put(usersCtrl.updateUserData)
  .delete(usersCtrl.deleteUser);

router.route("/users/password/:login")
  .put(usersCtrl.updatePassword)

router.route("/upload")
  .post(imageCtrl.uploadImage)

router.route("/upload/:id")
  .get(imageCtrl.getUploadedImage)



module.exports = router;
