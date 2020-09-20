export const CardReducer = (state = [], action) => {
	switch(action.type) {
		case "FETCH_CARDS":
			return [...state.filter(card => card._id === null), ...action.payload];
		case "CREATE_CARD":
			return [...state, action.payload];
		case "FETCH_CARD":
			return [...state.filter(card => card._id !== action.payload._id), action.payload];
		case "UPDATE_CARD":
			return [...state.map(card => card._id === action.payload._id ? action.payload : card)];
		case "DELETE_CARDS":
			return [...state.filter(set => !action.payload.includes(set))];
		default:
			return state;
	};
};

export const CardSelectReducer = (state = [], action) => {
	switch(action.type) {
		case "SELECT_CARD":
			return [...state, action.payload];
		case "DESELECT_CARD":
			return [...state.filter(card => card !== action.payload)];
		default:
			return state;
	};
};