import React from "react";
import {Link} from "react-router-dom";

const Header = () => {
	return (
		<div className="ui secondary pointing menu">
			<div className="ui container">
				<Link to="/sets" className="item">Flipcards</Link>
				<div className="right menu">
					<Link to="/login" className="item">Login</Link>
					<Link to="/register" className="item">Register</Link>
				</div>
			</div>
		</div>
	);
};

export default Header;