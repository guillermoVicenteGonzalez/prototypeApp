
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