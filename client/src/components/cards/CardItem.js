import React, {useRef} from "react";
import {connect} from "react-redux";
import ContentEditable from "react-contenteditable";
import {updateCard, flipCard} from "../../actions";
import "./CardList.css";

const CardItem = ({set, card, selectedCards, updateCard, flipCard}) => {
	const colors = ["#f66560", "#68cbf3", "#56c578", "#ae66ed", "#f7708e", "#49d5c4", "#ce8355"],
		  cardColor = useRef(colors[Math.floor(Math.random() * colors.length)]),
		  checkDisplay = set.deletingCards ? "inline-block" : "none",
		  flipped = card.flipped ? "flipped" : "";

	const onEditableKeyPress = (e) => {
		const acceptableKeys = [8, 37, 38, 39, 40];
		if(e.target.textContent.length > 100 && !acceptableKeys.includes(e.which)) {
			e.preventDefault();
		};
	};

	const renderSide = (side) => {
		return (
			<div className={side} style={{backgroundColor: cardColor.current}}>
				<ContentEditable
					html={card[side]}
					disabled={false}
					spellCheck={false}
					onKeyPress={(e) => onEditableKeyPress(e)}
					onBlur={(e) => updateCard({[side]: e.target.textContent || "Front"}, set._id, card._id)} />
				<button
					className="ui orange button"
					onClick={() => flipCard(card._id)}
				>
					<i className="exchange icon" />
				</button>
			</div>
		);
	};

	return (
		<div className="card">
			<div className="ui checkbox" style={{display: checkDisplay}}>
				<input 
					type="checkbox"
					checked={card.selected || false}
					onChange={(e) => updateCard({selected: !card.selected}, set._id, card._id)} />
				<label></label>
			</div>
			<div className={`${flipped} flipCard`}>
				{renderSide("front")}
				{renderSide("back")}
			</div>
		</div>
	);
};

export default connect(null, {updateCard, flipCard})(CardItem);