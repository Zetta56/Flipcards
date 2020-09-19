import React, {useEffect} from "react";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {fetchCards} from "../../actions";
import "./CardList.css";

const CardsList = ({sets, fetchCards, match}) => {
	useEffect(() => {
		fetchCards(match.params.setId);
	}, [fetchCards, match.params.setId]);

	const renderList = () => {
		return sets.map(set => {
			return (
				<div className="setItem card" style={{backgroundColor: set.color}} key={set._id}>
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
		});
	};

	return (
		<div id="CardsList">
			CardList
		</div>
	);
};

const mapStateToProps = (state) => {
	return {sets: state.sets};
};

export default connect(mapStateToProps, {fetchCards})(CardsList);