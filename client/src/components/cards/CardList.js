import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {fetchCards, updateCard, createCard} from "../../actions";
import CardItem from "./CardItem";
import "./CardList.css";

const CardList = ({set, cards, fetchCards, createCard, updateCard, match}) => {
	const [deleting, setDeleting] = useState(false);
	const deletingStyles = deleting
		? {trashColor: "gray", checkDisplay: "inline-block"}
		: {trashColor: "red", checkDisplay: "none"};
	
	useEffect(() => {
		fetchCards(match.params.setId);
	}, [fetchCards, match]);

	const onTrashClick = () => {
		cards.forEach(card => {
			if(card.selected) {
				updateCard({selected: false}, set._id, card._id);
			};
		});
		setDeleting(!deleting);
	};

	const renderTopButtons = () => {
		if(cards.length > 0) {
			return (
				<span className="topButtons">
					<button
						className={`ui ${deletingStyles.trashColor} button`}
						onClick={() => onTrashClick()}
					>
						<i className="trash icon" />
					</button>
					<Link
						to={`/sets/${set._id}/cards/delete`}
						className="ui red button"
						style={{display: deletingStyles.checkDisplay}}
					>
						<i className="check icon" />
					</Link>
					<Link to={`/sets/${set._id}/cards/practice`} className="ui large blue button">Shuffle</Link>
				</span>
			);
		};
	};
	
	const renderList = () => {
		return cards.map(card => {
			return <CardItem set={set} card={card} deleting={deleting} key={card._id} />
		});
	};

	if(!set) {
		return null;
	};

	return (
		<div id="cardsList" style={{backgroundColor: set.color}}>
			<h1>
				<span className="title">{set.title}</span>
				{renderTopButtons()}
			</h1>
			<div className="ui cards">
				{renderList()}
				<button className="ui green create button card" onClick={() => createCard(match.params.setId)}>
					<span>
						<i className="plus icon" />Create
					</span>
				</button>
			</div>
		</div>
	);
};

const mapStateToProps = (state, ownProps) => {
	return {
		set: state.sets.filter(set => set._id === ownProps.match.params.setId)[0],
		cards: state.cards
	};
};

export default connect(mapStateToProps, {fetchCards, createCard, updateCard})(CardList);