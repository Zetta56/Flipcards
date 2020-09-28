const express = require("express"),
	  router = express.Router({mergeParams: true}),
	  middleware = require("../middleware"),
	  Set = require("../models/Set"),
	  Card = require("../models/Card");

router.get("/shuffle", async (req, res) => {
	try {
		const foundCards = await Card.find({set: req.params.setId});
		let random, temp;
		for(i = foundCards.length - 1; i >= 0; i--) {
			//Swaps random card with last card (Fisher-Yates Shuffle)
			random = Math.floor(Math.random() * foundCards.length);
			temp = foundCards[random];
			foundCards[random] = foundCards[i];
			foundCards[i] = temp;
		};
		res.json(foundCards);
	} catch(err) {
		res.status(500).json(err);
	};
});

router.get("/", async (req, res) => {
	try {
		const foundCards = await Card.find({set: req.params.setId});
		res.json(foundCards);
	} catch(err) {
		res.status(500).json(err);
	};
});

router.post("/", async (req, res) => {
	try {
		const newCard = await Card.create({front: "Front", back: "Back", set: req.params.setId});
		const foundSet = await Set.findById(req.params.setId);
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
		const updatedCard = await Card.findByIdAndUpdate(req.params.cardId, req.body, {new: true});
		res.json(updatedCard);
	} catch(err) {
		res.status(500).json(err);
	};
});

router.delete("/", async (req, res) => {
	try {
		const foundSet = await Set.findById(req.params.setId);
		const foundCards = await Card.find({set: req.params.setId, selected: true});
		foundCards.forEach(async (card) => {
			await foundSet.cards.pull(card._id);
			await card.remove();
		});
		await foundSet.save();
		res.json(foundCards.map(card => card._id));
	} catch(err) {
		res.status(500).json(err);
	};
});

module.exports = router;