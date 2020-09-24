import React from "react";
import {Link} from "react-router-dom"
import {connect} from "react-redux";
import history from "../../history";
import {deleteCards} from "../../actions";
import Modal from "../Modal";

const SetDelete = ({selectedCards, deleteCards, match}) => {
	const renderActions = () => {
		return (
			<React.Fragment>
				<button
					className="ui red button"
					onClick={() => deleteCards(match.params.setId)}
				>
					Confirm
				</button>
				<Link to={`/sets/${match.params.setId}`} className="ui button">Cancel</Link>
			</React.Fragment>
		);
	};
	
	return (
		<Modal
			header="Confirm Deletion"
			content={"Are you sure you want to delete ALL of your selected cards?"}
			actions={renderActions()}
			onDismiss={() => history.push(`/sets/${match.params.setId}`)}
			id="modalDelete" />
	);
};

export default connect(null, {deleteCards})(SetDelete);