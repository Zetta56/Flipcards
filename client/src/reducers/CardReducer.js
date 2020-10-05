export default (state = [], action) => {
	switch(action.type) {
		case "FETCH_CARDS":
		case "SHUFFLE_CARDS":
			return [...action.payload];
		case "CREATE_CARD":
			return [...state, action.payload];
		case "UPDATE_CARD":
			return [...state.map(card => card._id === action.payload._id ? action.payload : card)];
		case "DELETE_CARDS":
			return [...state.filter(card => !action.payload.includes(card))];
		default:
			return state;
	};
};