const mongoose = require("mongoose");

const cardSchema = new mongoose.Schema({
	front: String,
	back: String,
	set: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Set"
	}
});

module.exports = mongoose.model("Card", cardSchema);