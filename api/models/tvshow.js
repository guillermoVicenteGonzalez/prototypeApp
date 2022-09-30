/**
 * @typedef tvshow
 * @property {string} title.required - show title
 * @property {number} year - show's year of release
 * @property {string} country -shows's country of origin
 * @property {string} poster -shows's poster
 * @property {number} seasons -number of seasons the show has
 * @property {string} genre -show's genre
 * @property {string} summary -a brief summary of the show 
 */

const mongoose = require("mongoose");
const tvshowSchema = new mongoose.Schema(
	{
		title: 		{ type: String, unique:true},
		year: 		{ type: Number },
		country: 	{ type: String },
		poster:  	{ type: String },
		seasons: 	{ type: Number },
		genre: 		{
			type: String,
			enum: ['Drama', 'Fantasy', 'Sci-Fi', 'Thriller', 'Comedy']
		},
		summary: 	{ type: String }
	}
);

const TVShowModel = mongoose.model("TVShow", tvshowSchema);
module.exports = TVShowModel;
