import React from "react";
import {connect} from "react-redux";
import ContentEditable from "react-contenteditable";
import {updateCard} from "../../actions";
import "./CardList.css";

const CardsItem = ({set, card, selectedCards, updateCard}) => {
	const onCardClick = () => {
		if(card.display === "front") {
			updateCard({display: "back"}, set._id, card._id);
		} else {
			updateCard({display: "front"}, set._id, card._id);
		};
	};

	const checkDisplay = set.deletingCards ? "inline-block" : "none",
		  displayText = card.display === "front" ? card.front : card.back;
	
	return (
		<div className="card" onClick={() => onCardClick()}>
			<div className="ui checkbox" onClick={(e) => e.stopPropagation()} style={{display: checkDisplay}}>
				<input 
					type="checkbox"
					checked={card.selected || false}
					onChange={(e) => updateCard({selected: !card.selected}, set._id, card._id)} />
				<label></label>
			</div>
			<div className="body">
			<ContentEditable
				html={displayText}
				disabled={false}
				onClick={(e) => e.stopPropagation()}
				onBlur={(e) => updateCard({[card.display]: e.target.textContent}, set._id, card._id)} />
			</div>
		</div>
	);
};

export default connect(null, {updateCard})(CardsItem);