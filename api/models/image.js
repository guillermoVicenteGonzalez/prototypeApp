
/**
 * @typedef image
 * @property {string} name.required - show title
 * @property {string} desc - show's year of release
 * @property {string} country -shows's country of origin
 * @property {string} data -this is a struct and i don't know how to document it yet
 */

const mongoose = require("mongoose");
const imageSchema = new mongoose.Schema(
	{
        name: String,
        desc: String,
        image:
        {
            data: String,
            contentType: String
        }
    }
);

const imageModel = mongoose.model("image", imageSchema);
module.exports = imageModel;