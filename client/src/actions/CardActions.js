import axios from "axios";
import {error} from "./ErrorActions";
import {unflipItems} from "./FlipActions";
import history from "../history";

export const fetchCards = (setId) => {
	return async (dispatch) => {
		try {
			const response = await axios.get(`/api/sets/${setId}/cards`);
			
			dispatch(unflipItems());

			dispatch({
				type: "FETCH_CARDS",
				payload: response.data
			});
		} catch(err) {
			await history.push("/sets");
			await dispatch(error(err.response.data.message));
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
			await dispatch(error(err.response.data.message));
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
			await dispatch(error(err.response.data.message));
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
			await dispatch(error(err.response.data.message));
		};
	};
};

export const shuffleCards = (setId, lastShuffle) => {
	return async (dispatch) => {
		try {
			const response = await axios.post(`/api/sets/${setId}/cards/shuffle`, lastShuffle || []);
			
			dispatch({
				type: "SHUFFLE_CARDS",
				payload: response.data
			});
		} catch(err) {
			await history.push(`/sets/${setId}`);
			await dispatch(error(err.response.data.message));
		};
	};
};