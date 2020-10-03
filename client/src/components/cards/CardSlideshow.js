import React, {useEffect} from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {Slide} from "react-slideshow-image";
import {updateCard, shuffleCards} from "../../actions";
import CardSlide from "./CardSlide";
import "react-slideshow-image/dist/styles.css";
import "./CardSlideshow.css";

const CardSlideshow = ({cards, set, flippedItems, updateCard, shuffleCards, match}) => {
	useEffect(() => {
		shuffleCards(match.params.setId);
	}, [shuffleCards, match]);

	const renderSlideItems = () => {
		const slides = cards.map(card => {
			return <CardSlide card={card} set={set} flippedItems={flippedItems} key={card._id} />
		});
		//Adds reshuffle slide to the end
		slides.push(
			<div className="slide last" key="lastSlide">
				<div>
					<span>You are done!</span>
					<button className="ui blue button">Reshuffle?</button>
				</div>
			</div>
		);
		return slides;
	};

	if(!set) {
		return null;
	};

	return (
		<div id="cardSlides" style={{backgroundColor: set.color}}>
			<h1>
				{set.title}
				<i className="question circle outline icon" />
				<div className="ui right pointing label">Tip: You can click a card to flip it</div>
			</h1>
			<Link to={`/sets/${set._id}`} className="ui button"><i className="angle left icon" />Back</Link>
			<Slide autoplay={false} infinite={false} easing={"ease"} transitionDuration={300}>
				{renderSlideItems()}
			</Slide>
		</div>
	);
};

const mapStateToProps = (state, ownProps) => {
	return {
		cards: state.cards,
		set: state.sets.filter(set => set._id === ownProps.match.params.setId)[0],
		flippedItems: state.flipped
	};
};

export default connect(mapStateToProps, {updateCard, shuffleCards})(CardSlideshow);