import axios from "axios";
import history from "../history";
import {error} from "./index";

export const createUser = (formValues) => {
	return async (dispatch) => {
		try {
			await axios.post("/api/register", formValues);
			dispatch(login({username: formValues.username, password: formValues.password}));
		} catch(err) {
			await history.push("/register");
			await dispatch(error(err.response.data.message));
		};
	};
};

export const login = (formValues, initial) => {
	//Accessed on initial app render
	if(initial) {
		return {
			type: "LOGIN",
			payload: formValues
		}
	};

	//Accessed from login form
	return async (dispatch) => {
		try {
			const response = await axios.post("/api/login", formValues);
			
			dispatch({
				type: "LOGIN",
				payload: response.data
			});
			
			history.push("/sets");
		} catch(err) {
			await history.push("/login");
			await dispatch(error(err.response.data.message));
		};
	};
};

export const logout = (initial) => {
	return async (dispatch) => {
		await axios.get("/api/logout");
		
		dispatch({
			type: "LOGOUT",
		});
	};
};