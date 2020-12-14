import React from "react";
import {Link} from "react-router-dom";
import FlipCard from "./FlipCard";
import "./Landing.css";

const Landing = () => {
	return (
		<div id="landing">
			<FlipCard name="landing" backgroundColor="#ba70f7">
				<span>FlipCards</span>
				<span>
					<div>A straightforward flash card site designed for studying.</div>
					<Link to="/register" className="ui huge blue button">Get Started</Link>
				</span>
			</FlipCard>
		</div>
	);
};

export default Landing;