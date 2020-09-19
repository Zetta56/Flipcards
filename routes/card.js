const express = require("express"),
	  router = express.Router(),
	  middleware = require("../middleware"),
	  Set = require("../models/Set"),
	  Card = require("../models/Card");

router.get("/", async (req, res) => {
	try {
		const foundCard = await Card.find({set: req.query.setId});
		res.json(foundCard);
	} catch(err) {
		res.status(500).json(err);
	};
});

router.post("/", async (req, res) => {
	try {
		const newCard = await Card.create({front: "Side 1", back: "Side 2", set: req.body.setId});
		const foundSet = await Set.findById(req.body.setId);
		foundSet.cards.push(newCard._id);
		foundSet.save();
		res.json(newCard);
	} catch(err) {
		res.status(500).json(err);
	};
});

router.get("/:cardId", async (req, res) => {
	try {
		const foundCard = await Card.findById(req.params.cardId);
		res.json(foundCard);
	} catch(err) {
		res.status(500).json(err);
	};
});

router.put("/:cardId", async (req, res) => {
	try {
		const updatedCard = await Card.findByIdAndUpdate(req.params.cardId, req.body);
		res.json(updatedCard);
	} catch(err) {
		res.status(500).json(err);
	};
});

router.delete("/:cardId", async (req, res) => {
	try {
		const foundSet = await Set.findById(req.body.setId);
		await foundSet.cards.pull(req.params.cardId);
		await foundSet.save();
		await Card.findByIdAndDelete(req.params.cardId);
		res.json(req.params.cardId);
	} catch(err) {
		res.status(500).json(err);
	};
});

module.exports = router;