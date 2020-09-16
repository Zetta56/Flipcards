export default (state = [], action) => {
	switch(action.type) {
		case "FETCH_SETS":
			return [...state.filter(set => set._id === null), ...action.payload];
		case "CREATE_SET":
			return [...state, action.payload];
		case "FETCH_SET":
			return [...state.filter(set => set._id !== action.payload._id), action.payload];
		case "UPDATE_SET":
			return [...state.map(step => step._id === action.payload._id ? action.payload : step)];
		case "DELETE_SET":
			return [...state.filter(set => set._id !== action.payload)]
		default:
			return state;
	};
};