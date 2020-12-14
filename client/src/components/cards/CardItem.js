import React, {useRef} from "react";
import {connect} from "react-redux";
import ContentEditable from "react-contenteditable";
import {updateCard, flipItem} from "../../actions";
import FlipCard from "../FlipCard";
import "./CardList.css";

const CardItem = ({set, card, deleting, updateCard, flipItem}) => {
	// Red, blue, green, purple, pink, cyan
	const colors = ["#f66560", "#68cbf3", "#56c578", "#ae66ed", "#f7708e", "#49d5c4", "#ffbe53"],
		  cardColor = useRef(colors[Math.floor(Math.random() * colors.length)]),
		  checkDisplay = deleting ? "inline-block" : "none";

	const renderSide = (side) => {
		return (
			<React.Fragment>
				<ContentEditable
					html={card[side]}
					disabled={false}
					spellCheck={false}
					onBlur={(e) => updateCard({[side]: e.target.textContent || side}, set._id, card._id)} />
				<button
					className="ui orange button"
					onClick={() => flipItem(card._id)}
				>
					<i className="exchange icon" />
				</button>
			</React.Fragment>
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
			<FlipCard name={card._id} backgroundColor={cardColor.current} disableFlip>
				{renderSide("front")}
				{renderSide("back")}
			</FlipCard>
		</div>
	);
};

export default connect(null, {updateCard, flipItem})(CardItem);