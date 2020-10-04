import React from "react";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {flipItem} from "../actions";
import "./Landing.css";

const Landing = ({flippedItems, flipItem}) => {
	const flipped = flippedItems.includes("landing") ? "flipped" : "";

	return (
		<div id="landing">
			<div className={`${flipped} flipCard`}>
				<div className="front" onClick={() => flipItem("landing")}>
					FlipCards
				</div>
				<div className="back" onClick={() => flipItem("landing")}>
					<span>
						<div>A straightforward flash card site designed for studying.</div>
						<Link to="/register" className="ui huge blue button">Get Started</Link>
					</span>
				</div>
			</div>
		</div>
	);
};

const mapStateToProps = (state) => {
	return {flippedItems: state.flipped};
};

export default connect(mapStateToProps, {flipItem})(Landing);