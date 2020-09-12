//This files is automatically run when dev server starts
const {createProxyMiddleware} = require("http-proxy-middleware");

module.exports = (app) => {
	app.use(createProxyMiddleware("/api", {
		target: process.env.BACKEND_URL,
    	changeOrigin: true,
	}));
};