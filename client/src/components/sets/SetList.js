import React, {useEffect} from "react";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {fetchSets} from "../../actions";
import SetItem from "./SetItem";
import "./SetsList.css";

const SetsList = ({sets, fetchSets}) => {
	useEffect(() => {
		fetchSets();
	}, [fetchSets]);

	const renderList = () => {
		return sets.map(set => {
			return <SetItem set={set} key={set._id} />
		});
	};

	return (
		<div id="setsList">
			<Link to="/sets/create" className="ui green button"><i className="plus icon" />Create</Link>
			<div className="ui cards">
				{renderList()}
			</div>
		</div>
	);
};

const mapStateToProps = (state) => {
	return {sets: state.sets};
};

export default connect(mapStateToProps, {fetchSets})(SetsList);