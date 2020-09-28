import React, {useEffect} from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {shuffleCards} from "../../actions";
import "./CardPractice.css";

const CardPractice = ({cards, set, shuffleCards, match}) => {
	useEffect(() => {
		shuffleCards(match.params.setId);
	}, [shuffleCards, match]);
	
	const renderList = () => {
		return cards.map(card => {
			return <div>{card.front}</div>
		});
	};

	if(!set || !cards) {
		return null;
	};

	return (
		<div id="cardsPractice" style={{backgroundColor: set.color}}>
			<h1>{set.title}</h1>
			<Link to={`/sets/${set._id}`} className="ui button"><i className="angle left icon" />Back</Link>
			{renderList()}
		</div>
	);
};

const mapStateToProps = (state, ownProps) => {
	return {cards: state.cards, set: state.sets.filter(set => set._id === ownProps.match.params.setId)[0]};
};

export default connect(mapStateToProps, {shuffleCards})(CardPractice);