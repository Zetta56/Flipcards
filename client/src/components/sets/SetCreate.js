import React, {useCallback} from "react";
import {Link} from "react-router-dom"
import {connect} from "react-redux";
import {reduxForm, Field} from "redux-form";
import history from "../../history";
import {createSet} from "../../actions";
import Modal from "../Modal";

const SetCreate = ({handleSubmit, createSet}) => {
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
			<form className="ui form" onSubmit={handleSubmit((formValues) => createSet(formValues))}>
				<Field name="title" component={renderInput} />
				<button className="ui green button">Create</button>
				<Link to="/sets" className="ui button">Cancel</Link>
			</form>
		);
	};

	return (
		<Modal
			header="Create New Set"
			content={renderForm()}
			onDismiss={() => history.push("/sets")}
			id="setCreate" />
	);
};

const reduxWrapped = reduxForm({
	form: "Create Set"
})(SetCreate);

export default connect(null, {createSet})(reduxWrapped);