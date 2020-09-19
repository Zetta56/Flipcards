import axios from "axios";
import {error} from "./ErrorActions";
import history from "../history";

export const fetchCards = (setId) => {
	return async (dispatch) => {
		try {
			const response = await axios.get("/api/cards", {params: {setId: setId}});
			
			dispatch({
				type: "FETCH_CARDS",
				payload: response.data
			});
		} catch(err) {
			await history.push("/sets");
			await setTimeout(() => dispatch(error(err.response.data.message)), 400);
		};
	};
};

export const createCard = (formValues, setId) => {
	return async (dispatch) => {
		try {
			const response = await axios.post("/api/cards", {...formValues, setId: setId});

			dispatch({
				type: "CREATE_CARD",
				payload: response.data
			});
		} catch(err) {
			await history.push(`/sets/${setId}`);
			await setTimeout(() => dispatch(error(err.response.data.message)), 400);
		};
	};
};

export const fetchCard = (setId, cardId) => {
	return async (dispatch) => {
		try {
			const response = await axios.get(`/api/cards/${cardId}`);
			
			dispatch({
				type: "FETCH_CARD",
				payload: response.data
			});
		} catch(err) {
			await history.push(`/sets/${setId}`);
			await setTimeout(() => dispatch(error(err.response.data.message)), 400);
		};
	};
};

export const updateCard = (formValues, setId, cardId) => {
	return async (dispatch) => {
		try {
			const response = await axios.put(`/api/cards/${cardId}`, formValues);

			dispatch({
				type: "UPDATE_CARD",
				payload: response.data
			});
		} catch(err) {
			await history.push(`/sets/${setId}`);
			await setTimeout(() => dispatch(error(err.response.data.message)), 400);
		};
	};
};

export const deleteCard = (setId, cardId) => {
	return async (dispatch) => {
		try {
			const response = await axios.delete(`/api/cards/${cardId}`, {setId: setId});
			
			dispatch({
				type: "DELETE_CARD",
				payload: response.data
			});

			history.push(`/sets/${setId}`);
		} catch(err) {
			await history.push(`/sets/${setId}`);
			await setTimeout(() => dispatch(error(err.response.data.message)), 400);
		};
	};
};