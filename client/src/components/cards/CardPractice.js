import React from "react";
import {connect} from "react-redux";

const CardPractice = ({cards}) => {
	console.log(cards)
	return (
		<div>
			CardPractice
		</div>
	);
};

const mapStateToProps = (state) => {
	return {cards: state.cards}
};

export default connect(mapStateToProps)(CardPractice);