import React, {useEffect} from "react";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {updateSet, fetchCards, createCard, deleteCards} from "../../actions";
import CardItem from "./CardItem";
import "./CardList.css";

const CardList = ({set, cards, flippedItems, fetchSet, updateSet, fetchCards, createCard, deleteCards, match}) => {
	useEffect(() => {
		fetchCards(match.params.setId);
	}, [fetchCards, match]);

	const renderShuffle = () => {
		if(cards.length > 0) {
			return <Link to={`/sets/${set._id}/cards/practice`} className="ui large blue button">Shuffle</Link>
		};
	};
	
	const renderList = () => {
		return cards.map(card => {
			return <CardItem set={set} card={card} flippedItems={flippedItems} key={card._id} />
		});
	};

	if(!set) {
		return null;
	};
	
	const deletingStyles = set.deletingCards
		? {trashColor: "gray", checkDisplay: "inline-block"}
		: {trashColor: "red", checkDisplay: "none"}

	return (
		<div id="cardsList" style={{backgroundColor: set.color}}>
			<h1>{set.title}</h1>
			<div className="topButtons">
				<button className="ui green button" onClick={() => createCard(match.params.setId)}>
					<i className="plus icon" />Create
				</button>
				<button
					className={`ui ${deletingStyles.trashColor} button`}
					onClick={() => updateSet({deletingCards: !set.deletingCards}, match.params.setId)}
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
			</div>
			<div className="ui cards">
				{renderList()}
			</div>
			{renderShuffle()}
		</div>
	);
};

const mapStateToProps = (state, ownProps) => {
	return {
		set: state.sets.filter(set => set._id === ownProps.match.params.setId)[0],
		cards: state.cards,
		flippedItems: state.flipped
	};
};

export default connect(mapStateToProps, {updateSet, fetchCards, createCard, deleteCards})(CardList);