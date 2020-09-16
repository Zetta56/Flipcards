import React, {useEffect} from "react";
import {Router, Switch} from "react-router-dom";
import {connect} from "react-redux";
import axios from "axios"
import history from "../history";
import {resetError, login, logout} from "../actions";
import ProtectedRoute from "./ProtectedRoute";
import Header from "./Header";
import Landing from "./Landing";
import Register from "./auth/Register";
import Login from "./auth/Login";
import SetList from "./sets/SetList";
import SetCreate from "./sets/SetCreate";
import SetUpdate from "./sets/SetUpdate";
import SetDelete from "./sets/SetDelete";
import "./App.css";

const App = ({error, resetError, login, logout}) => {
	useEffect(() => {
		window.refreshCooldown = false;
		window.setInterval(() => window.refreshCooldown = false, 180000);

		const loadAuth = async () => {
			await axios.post("/api/refresh");
			const response = await axios.get("/api/access");
			
			if(response.data) {
				login(response.data._id);
			} else if(process.env.REACT_APP_GOOGLE_CLIENTID && window.gapi.auth2.getAuthInstance().isSignedIn.get()) {
				login({googleId: window.gapi.auth2.getAuthInstance().currentUser.get().getId()});
			} else {
				logout("initial");
			};
		};
		
		//Loads auth2 client and checks login status
		if(process.env.REACT_APP_GOOGLE_CLIENTID) {
			window.gapi.load("client:auth2", () => {
				window.gapi.client.init({
					clientId: process.env.REACT_APP_GOOGLE_CLIENTID,
					scope: "email"
				}).then(() => loadAuth());
			});
		} else {
			loadAuth();
		};
		
		//Removes error messages upon navigation
		history.listen(async (location) => {
			if(error) {
				resetError();
			};
		});
	}, [error, resetError, login, logout]);

	const renderError = () => {
		if(error) {
			return <div className="ui negative message" id="errorMessage">{error}</div>
		};
	};
	
	return (
		<Router history={history}>
			{renderError()}
			<Header />
			<div className="ui main container">
				<Switch>
					<ProtectedRoute path="/" exact component={Landing}></ProtectedRoute>
					<ProtectedRoute path="/register" exact component={Register}></ProtectedRoute>
					<ProtectedRoute path="/login" exact component={Login}></ProtectedRoute>
					<ProtectedRoute path="/sets" exact component={SetList} authenticate></ProtectedRoute>
					<ProtectedRoute path="/sets/create" exact component={SetCreate} authenticate></ProtectedRoute>
					<ProtectedRoute path="/sets/:setId/edit" exact component={SetUpdate} authenticate></ProtectedRoute>
					<ProtectedRoute path="/sets/:setId/delete" exact component={SetDelete} authenticate></ProtectedRoute>
				</Switch>
			</div>
		</Router>
	);
};

const mapStateToProps = (state) => {
	return {error: state.error.message}
};

export default connect(mapStateToProps, {resetError, login, logout})(App);