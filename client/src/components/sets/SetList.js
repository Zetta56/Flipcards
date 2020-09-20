import React, {useEffect} from "react";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {fetchSets} from "../../actions";
import "./SetList.css";

const SetsList = ({sets, fetchSets}) => {
	useEffect(() => {
		fetchSets();
	}, [fetchSets]);

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
		<div id="setsList">
			<div className="ui cards">
				{renderList()}
					<Link to="/sets/create" className="ui green create button setItem">
						<i className="plus icon" />Create
					</Link>
			</div>
		</div>
	);
};

const mapStateToProps = (state) => {
	return {sets: state.sets};
};

export default connect(mapStateToProps, {fetchSets})(SetsList);