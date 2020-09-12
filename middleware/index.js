const passport = require("passport"),
	  mongoose = require("mongoose");

const middleware = {};

middleware.isLoggedIn = (req, res, next) => {
	if(!req.user) {
		return res.status(401).json({message: "You must be logged in to do that.", redirect: "/login"});
	};
	next();
};

middleware.isNotLoggedIn = (req, res, next) => {
	if(req.user) {
		return res.status(403).json({message: "You are already logged in."});
	};
	next();
};

module.exports = middleware;