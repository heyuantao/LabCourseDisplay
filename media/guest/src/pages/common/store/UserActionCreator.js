import {fromJS} from "immutable";
import * as actionType from "./constants"
import Settings from "../../../Settings";
import Auth from "../Auth";

const req = Settings.request;
const userAPIURL = Settings.userAPIURL;
const logoutAPIURL = Settings.logoutAPIURL;

export const getUser = () => {
    return (dispatch)=>{
        let action = {type:actionType.USER_FETCHING,playload:fromJS({})};
        dispatch(action);
        req.get(userAPIURL,{}).then((response)=>{
            let action = {type:actionType.USER_FETCHED,playload:fromJS(response.data)};
            dispatch(action)
        }).catch((error)=>{
            console.log("Error in catch !")
        })
    }
}

export const logout = () => {
    return (dispatch) => {
        Auth.clearJWT();
        let action = {type:actionType.USER_LOGOUT,playload:fromJS({})};
        dispatch(action);
        dispatch(getUser());
    }
}