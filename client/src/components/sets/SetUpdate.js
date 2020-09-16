import React, {useEffect, useCallback} from "react";
import {Link} from "react-router-dom"
import {connect} from "react-redux";
import {reduxForm, Field} from "redux-form";
import history from "../../history";
import {fetchSet, updateSet} from "../../actions";
import Modal from "../Modal";

const SetUpdate = ({match, handleSubmit, fetchSet, updateSet}) => {
	useEffect(() => {
		fetchSet(match.params.setId);
	}, [fetchSet, match.params.setId]);

	const renderInput = useCallback(({input}) => {
		return (
			<React.Fragment>
				<label>Title</label>
				<input {...input} type="text" placeholder="Title" required />
			</React.Fragment>
		);
	}, []);

	const renderForm = () => {
		return (
			<form className="ui form" onSubmit={handleSubmit((formValues) => updateSet(formValues, match.params.setId))}>
				<Field name="title" component={renderInput} />
				<button className="ui orange button">Update</button>
				<Link to="/sets" className="ui button">Cancel</Link>
			</form>
		);
	};
	
	return (
		<Modal
			header="Rename Set"
			content={renderForm()}
			onDismiss={() => history.push("/sets")}
			id="setUpdate" />
	);
};

const reduxWrapped = reduxForm({
	form: "Update Set",
	enableReinitialize: true
})(SetUpdate);

const mapStateToProps = (state, ownProps) => {
	let currentSet = null;
	//Picks current set from array of all loaded sets
	for(let i = 0; i < state.sets.length; i++) {
		currentSet =  state.sets[i]._id === ownProps.match.params.setId ? state.sets[i] : currentSet;
	};
	return currentSet ? {initialValues: {title: currentSet.title}} : {};
};


export default connect(mapStateToProps, {fetchSet, updateSet})(reduxWrapped);