import React, {useEffect} from "react";
import {Router, Switch} from "react-router-dom";
import {connect} from "react-redux";
import axios from "axios"
import history from "../history";
import {resetError, login, logout} from "../actions";
import ProtectedRoute from "./ProtectedRoute";
import Header from "./Header";
import Register from "./Register";
import Login from "./Login";
import SetsList from "./sets/SetsList"
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
			<Header />
			<div id="mainContainer">
				{renderError()}
				<div className="ui container">
					<Switch>
						<ProtectedRoute path="/sets" exact component={SetsList}></ProtectedRoute>
						<ProtectedRoute path="/register" exact component={Register}></ProtectedRoute>
						<ProtectedRoute path="/login" exact component={Login}></ProtectedRoute>
					</Switch>
				</div>
			</div>
		</Router>
	);
};

const mapStateToProps = (state) => {
	return {error: state.error.message}
};

export default connect(mapStateToProps, {resetError, login, logout})(App);