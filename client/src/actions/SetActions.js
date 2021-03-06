import axios from "axios";
import {error} from "./ErrorActions";
import {unflipItems} from "./FlipActions";
import history from "../history";

export const fetchSets = () => {
	return async (dispatch) => {
		try {
			const response = await axios.get("/api/sets");

			dispatch(unflipItems());

			dispatch({
				type: "FETCH_SETS",
				payload: response.data
			});
		} catch(err) {
			await history.push("/sets");
			await dispatch(error(err.response.data.message));
		};
	};
};

export const createSet = (formValues) => {
	return async (dispatch) => {
		try {
			const response = await axios.post("/api/sets", formValues);

			dispatch({
				type: "CREATE_SET",
				payload: response.data
			});

			history.push("/sets");
		} catch(err) {
			await history.push("/sets");
			await dispatch(error(err.response.data.message));
		};
	};
};

export const fetchSet = (setId) => {
	return async (dispatch) => {
		try {
			const response = await axios.get(`/api/sets/${setId}`);
			
			dispatch({
				type: "FETCH_SET",
				payload: response.data
			});
		} catch(err) {
			await history.push("/sets");
			await dispatch(error(err.response.data.message));
		};
	};
};

export const updateSet = (formValues, setId) => {
	return async (dispatch) => {
		try {
			const response = await axios.put(`/api/sets/${setId}`, formValues);

			dispatch({
				type: "UPDATE_SET",
				payload: response.data
			});

			if(formValues.title) {
				history.push("/sets");
			};
		} catch(err) {
			await history.push("/sets");
			await dispatch(error(err.response.data.message));
		};
	};
};

export const deleteSet = (setId) => {
	return async (dispatch) => {
		try {
			const response = await axios.delete(`/api/sets/${setId}`);
			
			dispatch({
				type: "DELETE_SET",
				payload: response.data
			});

			history.push("/sets");
		} catch(err) {
			await history.push("/sets");
			await dispatch(error(err.response.data.message));
		};
	};
};