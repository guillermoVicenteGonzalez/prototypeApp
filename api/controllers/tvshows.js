const mongoose = require("mongoose");
const TVShow = require("../models/tvshow");

//GET

/**
 * This endpoint returns all registered tvshows
 * @route GET /api/tvshows/
 * @group tvshows - tvshows operations
 * @param {tvshow.model} body.body.required - the user's to be logged on data 
 * @returns {Array.<tvshow>} 200 - returns a jwt for furhter  authentication
 * @returns {json} 4xx -{success:false, message: a message detailing the error}
 */
exports.findAllTVShows = async function(req, res){
  let tvshows = await TVShow.find().catch(err => {return undefined});
  if(tvshows){
    res.status(200).json({success:true, tvshows});
    console.log("request to get all tvshows successfull");
  }else{
    res.status(404).json({success:false, message:"internal error"});
  }
};

//GET:id
/**
 * Returns the tvshow whose id was used in the request parameters (not in the body)
 * @route GET /api/tvshows/:id
 * @group tvshows - tvshows operations
 * @returns {tvshow} 200 -returns a json with format {success:true,tvshow} where tvshow is the selected tvshow
 * @returns {json} 4xx -{success:false, message: a message detailing the error}
 */
exports.findById = async function(req, res){
  let tvshow = await TVShow.findById(req.params.id).catch(err => {return undefined});
  if(tvshow){
    res.status(200).json({success:true,tvshow});
  }else{
    res.status(404).json({success:true, message:"could not find tvshow with id: "+req.params.id});
  }
};

//GET:title
/**
 * Returns the tvshow whose title was used in the request parameters (not in the body)
 * @route GET /api/tvshows:title
 * @group tvshows - tvshows operations
 * @returns {tvshow} 200 - returns a jwt for furhter  authentication
 * @returns {json} 4xx -{success:false, message: a message detailing the error}
 */
exports.findByName = async function(req, res){
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
/**
 * This endpoint creates and registers a new tvshow
 * @route POST /api/tvshows/
 * @group tvshows - tvshows operations
 * @param {tvshow.model} body.body.required - the tvshow we want to add to the database
 * @returns {tvshow} 200 - returns a json with format {success:true, result} where result is the registered tvshow
 * @returns {json} 4xx -{success:false, message: a message detailing the error}
 */
exports.addTVShow = async function(req, res){
  //primero compruebo que la request tenga al menos estos campos
  if(req.body.summary != undefined && req.body.title != undefined && req.body.summary !== '' && req.body.title !== ''){
    let tvshow = new TVShow({
      title: req.body.title,
      year: req.body.year,
      country: req.body.country,
      poster: req.body.poster,
      seasons: req.body.seasons,
      genre: req.body.genre,
      summary: req.body.summary,
    });

    //ahora compruebo que no esta repetido
    let otherTVShow = await TVShow.findOne({ title: tvshow.title }).catch(err => {return undefined});
    if(otherTVShow){
      console.log("show alredy registered");
      res.status(400).json({success:false,message:"error registering tvshow: There alredy exists a tvshow with that name"});
    }else{
      console.log("fields are filled");
      let result = await tvshow.save().catch(err => {return undefined});
      if(result){
        res.status(201).json({success:true,result});
        console.log("success registering tvshow")
      }else{
        console.log(result);
        console.log("error registering tvshow in database")
        res.status(400).json({success:false, message:"error registering in database"});
      }
    }
  }else{
    console.log("unable to register tvshow due to empty request fields");
    //console.log(req.body);
    console.log(req.body.title, req.body.summary);
    res.status(400).json({success:false, message:"the request lacked vital fields"});
  }
  
};

//PUT:id
/**
 * This endpoint updates an existing tvshow
 * @route PUT /api/tvshows/:id
 * @group tvshows - tvshows operations
 * @param {tvshow.model} body.body.required - the updated tvshow. 
 * @returns {tvshow} 200 - returns a json with format {success:true, result} where result is the updated tvshow
 * @returns {json} 4xx -{success:false, message: a message detailing the error}
 */
exports.updateTVShow = async function(req, res){
  if(req.body.title && req.body.summary ){
    let tvshow = await TVShow.findById(req.params.id).catch(err => {return undefined});
    if(tvshow){
      tvshow.title = req.body.title;
      tvshow.year = req.body.year;
      tvshow.country = req.body.country;
      tvshow.poster = req.body.poster;
      tvshow.seasons = req.body.seasons;
      tvshow.genre = req.body.genre;
      tvshow.summary = req.body.summary;
  
      let result = await tvshow.save().catch(err => {return undefined});
      if(result){
        res.status(200).json({success:true,tvshow});
      }else{
        res.status(400).json({success:false, message:"error updating show"});
      }
    }else{
      res.status(404).json({success:false, message:"could not find requested show"});
    }
  }else{
    res.status(400).json({success:false, message:"the request lacked vital fields"});
  }
}


//DELTE:id
/**
 * This endpoint deletes de requested tvshow
 * @route DELETE /api/tvshows/:id
 * @group tvshows - tvshows operations
 * @returns {tvshow} 200 - returns a json with format {success:true, result} where result is the recently deleted tvshow
 * @returns {json} 4xx -{success:false, message: a message detailing the error}
 */
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

