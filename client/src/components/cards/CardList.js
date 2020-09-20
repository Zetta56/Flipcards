import React, {useEffect} from "react";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {fetchSet, fetchCards, createCard, deleteCards, selectCard, deselectCard} from "../../actions";
import "./CardList.css";

const CardsList = (props) => {
	const {fetchSet, fetchCards, match} = props;
	useEffect(() => {
		fetchSet(match.params.setId);
		fetchCards(match.params.setId);
	}, [fetchSet, fetchCards, match]);

	const onCheckboxChange = (cardId) => {
		if(props.selectedCards.includes(cardId)) {
			props.deselectCard(cardId);
		} else {
			props.selectCard(cardId);
		};
	};
	
	const renderList = () => {
		return props.cards.map(card => {
			return (
				<div className="card" key={card._id}>
					<div className="ui checkbox" onChange={() => onCheckboxChange(card._id)}>
						<input type="checkbox" />
						<label></label>
					</div>
					<div className="content">{card.front}</div>
				</div>
			);
		});
	};

	if(!props.set) {
		return null;
	};

	return (
		<div id="cardsList">
			<h1>{props.set.title}</h1>
			<hr />
			<button className="ui green button" onClick={() => props.createCard(props.match.params.setId)}>
				<i className="plus icon" />Create
			</button>
			<Link to={`/sets/${props.set._id}/cards/delete`} className="ui red button">
				<i className="trash icon" />
			</Link>
			<div className="ui cards">
				{renderList()}
			</div>
		</div>
	);
};

const mapStateToProps = (state, ownProps) => {
	return {
		set: state.sets.filter(set => set._id === ownProps.match.params.setId)[0],
		cards: state.cards,
		selectedCards: state.selectedCards
	};
};

export default connect(mapStateToProps, {
	fetchSet,
	fetchCards,
	createCard,
	deleteCards,
	selectCard,
	deselectCard
})(CardsList);