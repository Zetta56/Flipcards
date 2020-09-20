const express = require("express"),
	  router = express.Router(),
	  middleware = require("../middleware"),
	  Set = require("../models/Set"),
	  Card = require("../models/Card");

router.get("/", async (req, res) => {
	try {
		const foundSets = await Set.find({creator: req.user._id});
		res.json(foundSets);
	} catch(err) {
		res.status(500).json(err);
	};
});

router.post("/", async (req, res) => {
	try {
		const colors = ["#e65550", "#58bbe3", "#46d568", "#9e56dd", "#f5b134", "#e7607e", "#49d5c4", "#be7345"];
		const newSet = await Set.create({
			...req.body,
			creator: req.user._id,
			color: colors[Math.floor(Math.random() * colors.length)]
		});
		res.json(newSet);
	} catch(err) {
		res.status(500).json(err);
	};
});

router.get("/:setId", async (req, res) => {
	try {
		const foundSet = await Set.findById(req.params.setId);
		res.json(foundSet);
	} catch(err) {
		res.status(500).json(err);
	};
});

router.put("/:setId", async (req, res) => {
	try {
		const updatedSet = await Set.findByIdAndUpdate(req.params.setId, req.body);
		res.json(updatedSet);
	} catch(err) {
		res.status(500).json(err);
	};
});

router.delete("/:setId", async (req, res) => {
	try {
		await Card.deleteMany({set: req.params.setId});
		await Set.findByIdAndDelete(req.params.setId);
		res.json(req.params.setId);
	} catch(err) {
		res.status(500).json(err);
	};
});

module.exports = router;