import React from "react";
import {connect} from "react-redux";
import {Route, Redirect} from "react-router-dom";

const ProtectedRoute = ({currentUser, path, component}) => {
	if(currentUser === null) {
		return null;
	} else if(currentUser) {
		return <Route path={path} exact component={component}></Route>
	} else {
		return <Redirect to="/login" />
	};
};

const mapStateToProps = (state) => {
	return {currentUser: state.auth};
};

export default connect(mapStateToProps)(ProtectedRoute);