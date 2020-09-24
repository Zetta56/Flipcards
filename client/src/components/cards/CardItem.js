import React from "react";
import {connect} from "react-redux";
import ContentEditable from "react-contenteditable";
import {updateCard} from "../../actions";
import "./CardList.css";

const CardsItem = ({set, card, selectedCards, updateCard, match}) => {
	const checkDisplay = set.deletingCards ? "inline-block" : "none";

	return (
		<div className="card">
			<div className="ui checkbox" style={{display: checkDisplay}}>
				<input 
					type="checkbox"
					checked={card.selected || false}
					onChange={(e) => updateCard({selected: !card.selected}, set._id, card._id)} />
				<label></label>
			</div>
			<div className="content">
				<ContentEditable
					html={card.front}
					disabled={false}
					onBlur={(e) => updateCard({front: e.target.textContent}, set._id, card._id)} />
			</div>
		</div>
	);
};

export default connect(null, {updateCard})(CardsItem);