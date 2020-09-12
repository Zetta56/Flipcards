const express = require("express"),
	  router = express.Router(),
	  passport = require("passport"),
	  jwt = require("jsonwebtoken"),
	  OAuth2Client = require("google-auth-library").OAuth2Client,
	  User = require("../models/User");

router.get("/login", (req, res) => {
	res.json("logging in");
});

module.exports = router;