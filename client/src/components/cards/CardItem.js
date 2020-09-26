import React from "react";
import {connect} from "react-redux";
import ContentEditable from "react-contenteditable";
import {updateCard} from "../../actions";
import "./CardList.css";

const CardsItem = ({set, card, selectedCards, updateCard}) => {
	const checkDisplay = set.deletingCards ? "inline-block" : "none",
		  rotate = card.rotate ? "rotate" : "";
	
	return (
		<div className="card">
			<div className="ui checkbox" onClick={(e) => e.stopPropagation()} style={{display: checkDisplay}}>
				<input 
					type="checkbox"
					checked={card.selected || false}
					onChange={(e) => updateCard({selected: !card.selected}, set._id, card._id)} />
				<label></label>
			</div>
			<div className={`${rotate} body`} onClick={(e) => e.stopPropagation()}>
				<div className="front">
					<ContentEditable
						html={card.front}
						disabled={false}
						onBlur={(e) => updateCard({front: e.target.textContent}, set._id, card._id)} />
					<button
						className="ui orange button"
						onClick={() => updateCard({rotate: !card.rotate}, set._id, card._id)}
					>
						<i className="exchange icon" />
					</button>
				</div>
				<div className="back">
					<ContentEditable
						html={card.back}
						disabled={false}
						onBlur={(e) => updateCard({back: e.target.textContent}, set._id, card._id)} />
					<button
						className="ui orange button"
						onClick={() => updateCard({rotate: !card.rotate}, set._id, card._id)}
					>
						<i className="exchange icon" />
					</button>
				</div>
			</div>
		</div>
	);
};

export default connect(null, {updateCard})(CardsItem);