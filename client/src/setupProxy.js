//This files is automatically run when dev server starts
const {createProxyMiddleware} = require("http-proxy-middleware");

//ChangeOrigin finds sites based on name (can be on same IP)
module.exports = (app) => {
	app.use(createProxyMiddleware("/api", {
		target: process.env.BACKEND_URL,
    	changeOrigin: true,
	}));
};