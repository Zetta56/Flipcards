import React from "react";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {fetchSets} from "../../actions";
import "./SetsList.css";

const SetsList = ({fetchSets, set}) => {
	return (
		<div className="setItem card" style={{backgroundColor: set.color}}>
			<div className="content">
				<div className="header">{set.title}</div>
				<Link to={`/sets/${set._id}`} className="ui huge blue button">Practice</Link>
				<i className="ellipsis vertical icon" />
				<div className="dropdown">
					<Link to={`/sets/${set._id}/edit`}>Rename</Link>
					<Link to={`/sets/${set._id}/delete`}>Delete</Link>
				</div>
			</div>
		</div>
	);
};

export default connect(null, {fetchSets})(SetsList);