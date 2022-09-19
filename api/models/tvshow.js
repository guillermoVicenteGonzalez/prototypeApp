const mongoose = require("mongoose");
const tvshowSchema = new mongoose.Schema(
	{
		title: 		{ type: String },
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
