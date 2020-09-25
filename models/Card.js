const mongoose = require("mongoose");

const cardSchema = new mongoose.Schema({
	front: String,
	back: String,
	display: {type: String, default: "front"},
	selected: {type: Boolean, default: false},
	set: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Set"
	}
});

module.exports = mongoose.model("Card", cardSchema);