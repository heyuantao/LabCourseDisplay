import {combineReducers} from "redux";
import UserReducer from "../pages/common/store/UserReducer";

export default combineReducers(
    {
        user:UserReducer,
    }
)