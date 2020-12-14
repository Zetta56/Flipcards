const express = require("express"),
	  router = express.Router({mergeParams: true}),
	  middleware = require("../middleware"),
	  Set = require("../models/Set"),
	  Card = require("../models/Card");

router.post("/shuffle", middleware.setAuthorized, async (req, res) => {
	try {
		const foundCards = await Card.find({set: req.params.setId});
		let random, temp, diff = false;
		while(!diff) {
			for(i = foundCards.length - 1; i >= 0; i--) {
				//Swaps random card with last card (Fisher-Yates Shuffle)
				random = Math.floor(Math.random() * i);
				temp = foundCards[random];
				foundCards[random] = foundCards[i];
				foundCards[i] = temp;
				//Checks if randomized list is different from previous list
				if(req.body.length <= 1 || (req.body && req.body[i] && !foundCards[i]._id.equals(req.body[i]._id))) {
					diff = true;
				};
			};
		};
		res.json(foundCards);
	} catch(err) {
		res.status(500).json(err);
	};
});

router.get("/", middleware.setAuthorized, async (req, res) => {
	try {
		const foundCards = await Card.find({set: req.params.setId});
		res.json(foundCards);
	} catch(err) {
		res.status(500).json(err);
	};
});

router.post("/", middleware.setAuthorized, async (req, res) => {
	try {
		const newCard = await Card.create({front: "front", back: "back", set: req.params.setId});
		const foundSet = await Set.findById(req.params.setId);
		foundSet.cards.push(newCard._id);
		foundSet.save();
		res.json(newCard);
	} catch(err) {
		res.status(500).json(err);
	};
});

router.put("/:cardId", middleware.setAuthorized, middleware.cardAuthorized, async (req, res) => {
	try {
		const updatedCard = await Card.findByIdAndUpdate(req.params.cardId, req.body, {new: true});
		res.json(updatedCard);
	} catch(err) {
		res.status(500).json(err);
	};
});

router.delete("/", middleware.setAuthorized, async (req, res) => {
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