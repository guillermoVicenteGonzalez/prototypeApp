var mongoose = require("mongoose");
const TVShow = require("../models/tvshow");
//var TVShow = mongoose.model("TVShow");


//GET
exports.findAllTVShows = async function(req, res){
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
  let tvshows = await TVShow.find().catch(err => {return undefined});
  if(tvshows){
    res.status(200).json(tvshows);
  }else{
    res.status(204).send();
  }
};

//GET:id
exports.findById = async function(req, res){
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
  let tvshow = await TVShow.findById(req.params.id).catch(err => {return undefined});
  if(tvshow){
    res.status(200).json(tvshow);
  }else{
    res.status(204).send();
  }
};

//GET:title
exports.findByName = async function(req, res){
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
  let tvshow = await TVShow.findOne({title:req.params.title});
  if(tvshow){
    res.status(200).json(tvshow);
  }else{
    res.status(404).send();
  }
  console.log(req.params.title);
}

//POST
exports.addTVShow = async function(req, res){
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
  console.log("POST");
  console.log(req.body);

  let tvshow = new TVShow({
    title: req.body.title,
    year: req.body.year,
    country: req.body.country,
    poster: req.body.poster,
    seasons: req.body.seasons,
    genre: req.body.genre,
    summary: req.body.summary,
  });

  let resultado = await tvshow.save().catch(err => {return undefined});
  if(resultado){
    res.status(201).json(resultado);
  }else{
    res.status(204).send();
  }
};

//PUT:id
exports.updateTVShow = async function(req, res){
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
  let tvshow = await TVShow.findById(req.params.id).catch(err => {return undefined});
  if(tvshow){
    tvshow.title = req.body.title;
    tvshow.year = req.body.year;
    tvshow.country = req.body.country;
    tvshow.poster = req.body.poster;
    tvshow.seasons = req.body.seasons;
    tvshow.genre = req.body.genre;
    tvshow.summary = req.body.summary;

    //let result = await TVShow.updateOne(req.params, tvshow).catch(err => {console.error(err);return undefined});
    let result = await tvshow.save().catch(err => {return undefined});
    if(result){
      res.status(200).jsonp(tvshow);
    }else{
      res.status(204).send();
    }
  }else{
    res.status(204).send();
  }
}


//DELTE:id
exports.deleteTVShow = async function(req, res){
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
  let tvshow = await TVShow.findById(req.params.id).catch(err => {return undefined});
  if(tvshow){
    let result = await tvshow.remove().catch(err => {return undefined});
    if(result){
      res.status(200).json(tvshow);
    }else{
      res.status(204).send();
    }
  }else{
    res.status(204).send();
  }
};

