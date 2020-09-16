import React from "react";
import {connect} from "react-redux";
import {Route, Redirect} from "react-router-dom";

const ProtectedRoute = ({isLoggedIn, authenticate, path, component}) => {
	const redirectUrl = isLoggedIn ? "/sets" : "/login",
		  //Changes true/undefined to true/false
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
	return {isLoggedIn: state.auth.isLoggedIn};
};

export default connect(mapStateToProps)(ProtectedRoute);