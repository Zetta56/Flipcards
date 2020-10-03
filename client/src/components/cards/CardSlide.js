import React, {useRef} from "react";
import {connect} from "react-redux";
import {flipCard} from "../../actions";

const CardSlide = ({card, set, flipCard, match}) => {
	const colors = ["#f66560", "#68cbf3", "#56c578", "#ae66ed", "#f7708e", "#49d5c4", "#ce8355"],
		  cardColor = useRef(colors[Math.floor(Math.random() * colors.length)]),
		  flipped = card.flipped ? "flipped" : "";
	
	const renderSide = (side, card) => {
		return (
			<div
				className={side}
				style={{backgroundColor: cardColor.current}}
				onClick={() => flipCard(card._id)}
			>
				<div className="body">{card[side]}</div>
			</div>
		);
	};

	return (
		<div className="slide">
			<div className={`${flipped} flipCard`}>
				{renderSide("front", card)}
				{renderSide("back", card)}
			</div>
		</div>
	);
};

export default connect(null, {flipCard})(CardSlide);