import {combineReducers} from "redux";
import {reducer as FormReducer} from "redux-form";
import ErrorReducer from "./ErrorReducer";
import AuthReducer from "./AuthReducer";
import SetReducer from "./SetReducer";
import CardReducer from "./CardReducer";
import FlipReducer from "./FlipReducer";

export default combineReducers({
	form: FormReducer,
	error: ErrorReducer,
	auth: AuthReducer,
	sets: SetReducer,
	cards: CardReducer,
	flipped: FlipReducer
});