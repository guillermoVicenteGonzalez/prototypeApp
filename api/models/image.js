
const mongoose = require("mongoose");
const imageSchema = new mongoose.Schema(
	{
        name: String,
        desc: String,
        img:
        {
            data: Buffer,
            contentType: String
        }
    }
);

const imageModel = mongoose.model("image", imageSchema);
module.exports = imageModel;