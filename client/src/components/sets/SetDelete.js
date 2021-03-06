import React, {useEffect} from "react";
import {Link} from "react-router-dom"
import {connect} from "react-redux";
import history from "../../history";
import {fetchSet, deleteSet} from "../../actions";
import Modal from "../Modal";

const SetDelete = ({set, fetchSet, deleteSet, match}) => {
	useEffect(() => {
		fetchSet(match.params.setId);
	}, [fetchSet, match.params.setId]);

	const renderActions = (set) => {
		return (
			<React.Fragment>
				<button className="ui red button" onClick={() => deleteSet(match.params.setId)}>
					Confirm
				</button>
				<Link to="/sets" className="ui button">Cancel</Link>
			</React.Fragment>
		);
	};
	
	if(!set) {
		return null;
	};

	return (
		<Modal
			header="Confirm Deletion"
			content={`Are you sure you want to delete '${set.title}'?`}
			actions={renderActions(set)}
			onDismiss={() => history.push("/sets")}
			id="modalDelete" />
	);
};

const mapStateToProps = (state, ownProps) => {
	return {set: state.sets.filter(set => set._id === ownProps.match.params.setId)[0]};
};

export default connect(mapStateToProps, {fetchSet, deleteSet})(SetDelete);