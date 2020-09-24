import axios from "axios";
import {error} from "./ErrorActions";
import history from "../history";

export const fetchCards = (setId) => {
	return async (dispatch) => {
		try {
			const response = await axios.get(`/api/sets/${setId}/cards`);
			
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

export const createCard = (setId) => {
	return async (dispatch) => {
		try {
			const response = await axios.post(`/api/sets/${setId}/cards`);

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
			const response = await axios.get(`/api/sets/${setId}/cards/${cardId}`);
			
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
			const response = await axios.put(`/api/sets/${setId}/cards/${cardId}`, formValues);

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

export const deleteCards = (setId) => {
	return async (dispatch) => {
		try {
			const response = await axios.delete(`/api/sets/${setId}/cards`);
			
			dispatch({
				type: "DELETE_CARDS",
				payload: response.data
			});

			history.push(`/sets/${setId}`);
		} catch(err) {
			await history.push(`/sets/${setId}`);
			await setTimeout(() => dispatch(error(err.response.data.message)), 400);
		};
	};
};