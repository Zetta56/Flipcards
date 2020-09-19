const mongoose = require("mongoose");

const setSchema = new mongoose.Schema({
	title: String,
	color: String,
	cards: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Card"
	},
	creator: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User"
	}
});

module.exports = mongoose.model("Set", setSchema);