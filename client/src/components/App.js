import React from "react";
import {Router, Switch, Route} from "react-router-dom";
import history from "../history";
import ProtectedRoute from "./ProtectedRoute";
import Login from "./Login";
import Register from "./Register";

const App = () => {
	return (
		<Router history={history}>
			<Switch>
				<Route path="/login" exact component={Login} />
				<ProtectedRoute path="/register" exact component={Register} />
			</Switch>
		</Router>
	);
};

export default App;