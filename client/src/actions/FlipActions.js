export const flipItem = (id) => {
	return {
		type: "FLIP_ITEM",
		payload: id
	};
};

export const unflipItems = () => {
	return {
		type: "UNFLIP_ITEMS"
	}
};