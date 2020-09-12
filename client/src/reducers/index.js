import {combineReducers} from "redux";
import {reducer as FormReducer} from "redux-form";
import ErrorReducer from "./ErrorReducer";
import AuthReducer from "./AuthReducer";

export default combineReducers({
	form: FormReducer,
	error: ErrorReducer,
	auth: AuthReducer
});