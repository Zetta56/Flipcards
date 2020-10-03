export default (state = [], action) => {
	switch(action.type) {
		case "FETCH_CARDS":
		case "SHUFFLE_CARDS":
			return [...action.payload];
		case "CREATE_CARD":
			return [...state, action.payload];
		case "FETCH_CARD":
			return [...state.filter(card => card._id !== action.payload._id), action.payload];
		case "UPDATE_CARD":
			return [...state.map(card => card._id === action.payload._id ? action.payload : card)];
		case "DELETE_CARDS":
			return [...state.filter(set => !action.payload.includes(set))];
		case "FLIP_CARD":
			return [...state.map(card => card._id === action.payload ? {...card, flipped: !card.flipped} : card)];
		default:
			return state;
	};
};