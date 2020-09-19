export default (state = [], action) => {
	switch(action.type) {
		case "FETCH_CARDS":
			return [...state.filter(card => card._id === null), ...action.payload];
		case "CREATE_CARD":
			return [...state, action.payload];
		case "FETCH_CARD":
			return [...state.filter(card => card._id !== action.payload._id), action.payload];
		case "UPDATE_CARD":
			return [...state.map(card => card._id === action.payload._id ? action.payload : card)];
		case "DELETE_CARD":
			return [...state.filter(set => set._id !== action.payload)]
		default:
			return state;
	};
};