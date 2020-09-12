import React, {useEffect} from "react";
import axios from "axios";

const Login = () => {
	useEffect(() => {
		axios.get("/api/login");
	}, []);

	return (
		<div className="grid-x">
			<div className="cell small-6">1</div>
			<div className="cell small-6">2 <i className="fi-heart" /></div>
			App2
		</div>
	);
};

export default Login;