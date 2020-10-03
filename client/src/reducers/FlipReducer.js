export default (state = [], action) => {
	switch(action.type) {
		case "FLIP_ITEM":
			if(state.includes(action.payload)) {
				return [...state.filter(id => id !== action.payload)];
			} else {
				return [...state, action.payload];
			};
		case "UNFLIP_ITEMS":
			return [];
		default:
			return state;
	};
};