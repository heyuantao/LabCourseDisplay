import {combineReducers} from "redux";
//import UserReducer from "../pages/common/store/UserReducer";
import LocationIndicatorReducer from "../pages/common/store/LocationIndicatorReducer";

export default combineReducers(
    {
        //user:UserReducer,
        location:LocationIndicatorReducer,
    }
)