import React, {useEffect} from "react";
import {Router, Switch} from "react-router-dom";
import {connect} from "react-redux";
import axios from "axios"
import history from "../history";
import {resetError, unflipItems, login, logout} from "../actions";
import ProtectedRoute from "./ProtectedRoute";
import Header from "./Header";
import Landing from "./Landing";
import UserForm from "./auth/UserForm";
import SetList from "./sets/SetList";
import SetDelete from "./sets/SetDelete";
import CardList from "./cards/CardList";
import CardDelete from "./cards/CardDelete";
import CardSlideshow from "./cards/CardSlideshow";
import "./App.css";

const App = ({error, resetError, unflipItems, login, logout}) => {
	useEffect(() => {
		window.refreshCooldown = false;
		window.setInterval(() => window.refreshCooldown = false, 180000);

		const loadAuth = async () => {
			await axios.post("/api/refresh");
			const response = await axios.get("/api/access");
			
			if(response.data) {
				login(response.data._id, true);
			} else if(process.env.REACT_APP_GOOGLE_CLIENTID && window.gapi.auth2.getAuthInstance().isSignedIn.get()) {
				login({googleId: window.gapi.auth2.getAuthInstance().currentUser.get().getId()}, true);
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
		history.listen(() => {
			if(error) {
				resetError();
			};
		});
	}, [error, resetError, unflipItems, login, logout]);

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
					<ProtectedRoute path="/login" exact component={UserForm}></ProtectedRoute>
					<ProtectedRoute path="/sets" exact component={SetList} authenticate></ProtectedRoute>
					<ProtectedRoute path="/sets/:setId/delete" exact component={SetDelete} authenticate></ProtectedRoute>
					<ProtectedRoute path="/sets/:setId" exact component={CardList} authenticate></ProtectedRoute>
					<ProtectedRoute path="/sets/:setId/cards/delete" exact component={CardDelete} authenticate></ProtectedRoute>
					<ProtectedRoute path="/sets/:setId/cards/practice" exact component={CardSlideshow} authenticate></ProtectedRoute>
				</Switch>
			</div>
		</Router>
	);
};

const mapStateToProps = (state) => {
	return {error: state.error.message}
};

export default connect(mapStateToProps, {resetError, unflipItems, login, logout})(App);