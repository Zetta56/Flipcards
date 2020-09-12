import React from "react";
import {connect} from "react-redux";
import {Route, Redirect} from "react-router-dom";

const ProtectedRoute = ({authenticate, path, component}) => {
	const isLoggedIn = false,
		  redirectUrl = isLoggedIn ? "/tasks" : "/login",
		  authenticateStatus = authenticate ? true : false;
		  
	if(isLoggedIn === null) {
		return null;
	} else if(authenticateStatus === isLoggedIn) {
		return <Route path={path} component={component}></Route>
	} else {
		return <Redirect to={redirectUrl} />
	};
};

const mapStateToProps = (state) => {
	return {isLoggedIn: state.auth};
};

export default connect(mapStateToProps)(ProtectedRoute);