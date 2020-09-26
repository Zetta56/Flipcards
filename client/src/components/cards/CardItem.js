import React from "react";
import {connect} from "react-redux";
import ContentEditable from "react-contenteditable";
import {updateCard} from "../../actions";
import "./CardList.css";

const CardsItem = ({set, card, selectedCards, updateCard}) => {
	const onEditableKeyPress = (e) => {
		const acceptableKeys = [8, 37, 38, 39, 40];
		if(e.target.textContent.length > 100 && !acceptableKeys.includes(e.which)) {
			e.preventDefault();
		};
	};

	const checkDisplay = set.deletingCards ? "inline-block" : "none",
		  flipped = card.flipped ? "flipped" : "";
	
	return (
		<div className="card">
			<div className="ui checkbox" onClick={(e) => e.stopPropagation()} style={{display: checkDisplay}}>
				<input 
					type="checkbox"
					checked={card.selected || false}
					onChange={(e) => updateCard({selected: !card.selected}, set._id, card._id)} />
				<label></label>
			</div>
			<div className={`${flipped} body`} onClick={(e) => e.stopPropagation()}>
				<div className="front">
					<ContentEditable
						html={card.front}
						disabled={false}
						onKeyPress={(e) => onEditableKeyPress(e)}
						onBlur={(e) => updateCard({front: e.target.textContent || "Front"}, set._id, card._id)} />
					<button
						className="ui orange button"
						onClick={() => updateCard({flipped: !card.flipped}, set._id, card._id)}
					>
						<i className="exchange icon" />
					</button>
				</div>
				<div className="back">
					<ContentEditable
						html={card.back}
						disabled={false}
						onKeyPress={(e) => onEditableKeyPress(e)}
						onBlur={(e) => updateCard({back: e.target.textContent || "Back"}, set._id, card._id)} />
					<button
						className="ui orange button"
						onClick={() => updateCard({flipped: !card.flipped}, set._id, card._id)}
					>
						<i className="exchange icon" />
					</button>
				</div>
			</div>
		</div>
	);
};

export default connect(null, {updateCard})(CardsItem);