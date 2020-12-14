import React from "react";
import {connect} from "react-redux";
import {flipItem} from "../actions";
import "./FlipCard.css";

const FlipCard = ({flipItem, flippedItems, name, children, backgroundColor, disableFlip}) => {
    const flipped = flippedItems.includes(name) ? "flipped" : "";

    const onCardClick = (e) => {
        const excludedTags = ["INPUT", "BUTTON"];
        if(!excludedTags.includes(e.target.tagName) && !disableFlip) {
            flipItem(name);
        };
    };

    return (
        <div className={`${flipped} flipCard`}>
            <div 
                className="front" 
                onClick={e => onCardClick(e)} 
                style={{backgroundColor: backgroundColor}}
            >
                {children[0]}
            </div>
            <div 
                className="back" 
                onClick={e => onCardClick(e)} 
                style={{backgroundColor: backgroundColor}}
            >
                {children[1]}
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {flippedItems: state.flipped}
};

export default connect(mapStateToProps, {flipItem})(FlipCard);