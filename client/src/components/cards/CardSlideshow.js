import React, {useEffect, useRef} from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {Slide} from "react-slideshow-image";
import {shuffleCards} from "../../actions";
import CardSlide from "./CardSlide";
import "react-slideshow-image/dist/styles.css";
import "./CardSlideshow.css";

const CardSlideshow = ({cards, set, shuffleCards, match}) => {
	const slidesRef = useRef(null);

	useEffect(() => {
		shuffleCards(match.params.setId);
	}, [shuffleCards, match]);

	const onReshuffleClick = () => {
		shuffleCards(match.params.setId, cards);
		slidesRef.current.goTo(0);
	};

	const renderSlideItems = () => {
		const slides = cards.map(card => {
			return <CardSlide card={card} key={card._id} />
		});
		//Adds reshuffle slide to the end
		slides.push(
			<div className="slide last" key="lastSlide">
				<div>
					<span>You are done!</span>
					<button className="ui blue button" onClick={() => onReshuffleClick()}>Reshuffle?</button>
				</div>
			</div>
		);
		return slides;
	};

	if(!set) {
		return null;
	};

	return (
		<div id="cardSlideshow" style={{backgroundColor: set.color}}>
			<h1>
				<Link to={`/sets/${set._id}`} className="ui button">
					<i className="angle left icon" />Back
				</Link>
				<span>{set.title}</span>
			</h1>
			<Slide ref={slidesRef} autoplay={false} infinite={false} easing={"ease"} transitionDuration={250}>
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

export default connect(mapStateToProps, {shuffleCards})(CardSlideshow);