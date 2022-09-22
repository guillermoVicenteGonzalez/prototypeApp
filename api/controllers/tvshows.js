var mongoose = require("mongoose");
const TVShow = require("../models/tvshow");
//var TVShow = mongoose.model("TVShow");


//GET
exports.findAllTVShows = async function(req, res){
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
  let tvshows = await TVShow.find().catch(err => {return undefined});
  if(tvshows){
    res.status(200).json({success:true, tvshows});
    console.log("request to get all tvshows successfull");
  }else{
    res.status(404).json({success:false, message:"internal error"});
  }
};

//GET:id
exports.findById = async function(req, res){
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
  let tvshow = await TVShow.findById(req.params.id).catch(err => {return undefined});
  if(tvshow){
    res.status(200).json({success:true,tvshow});
  }else{
    res.status(404).json({success:true, message:"could not find tvshow with id: "+req.params.id});
  }
};

//GET:title
exports.findByName = async function(req, res){
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
  let tvshow = await TVShow.findOne({title:req.params.title});
  if(tvshow){
    res.status(200).json({success:true, tvshow});
    console.log(req.params.title);
  }else{
    res.status(404).send({success:false, message:"could not find requested tvshow with title: " + req.params.title});
    console.log(req.params.title);
  }
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

  let result = await tvshow.save().catch(err => {return undefined});
  if(result){
    res.status(201).json({success:true,result});
  }else{
    res.status(400).json({success:false, message:"error registering in database"});
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
      res.status(200).json({success:true,tvshow});
    }else{
      res.status(400).json({success:false, message:"error updating show"});
    }
  }else{
    res.status(404).json({success:false, message:"could not find requested show"});
  }
}


//DELTE:id
exports.deleteTVShow = async function(req, res){
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
  let tvshow = await TVShow.findById(req.params.id).catch(err => {return undefined});
  if(tvshow){
    let result = await tvshow.remove().catch(err => {return undefined});
    if(result){
      res.status(200).json({success:true, tvshow});
    }else{
      res.status(400).json({success:false, message:"error deleting tvshow " + tvshow.title});
    }
  }else{
    res.status(404).json({success:false, message:"could not find requested tvshow " + req.params.id});
  }
};

