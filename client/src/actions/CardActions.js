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

export const createCard = (setId) => {
	return async (dispatch) => {
		try {
			const response = await axios.post("/api/cards", {setId: setId});

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

//NOTE: CHANGE THIS TO POST WITH SCHEMA CHANGE
export const deleteCards = (setId, cardIds) => {
	return async (dispatch) => {
		try {
			const response = await axios.post("/api/cards", {setId: setId, cardIds: cardIds});
			
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

export const selectCard = (cardId) => {
	return {
		type: "SELECT_CARD",
		payload: cardId
	};
};

export const deselectCard = (cardId) => {
	return {
		type: "DESELECT_CARD",
		payload: cardId
	};
};