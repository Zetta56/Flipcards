import React, {useRef} from "react";
import FlipCard from "../FlipCard";

const CardSlide = ({card}) => {
	const colors = ["#f66560", "#68cbf3", "#56c578", "#ae66ed", "#f7708e", "#49d5c4", "#ffbe53"],
		  cardColor = useRef(colors[Math.floor(Math.random() * colors.length)]);

	return (
		<div className="slide">
			<FlipCard name={card._id} backgroundColor={cardColor.current}>
				<div className="body">{card.front}</div>
				<div className="body">{card.back}</div>
			</FlipCard>
		</div>
	);
};

export default CardSlide;