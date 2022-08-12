import axios from "axios";
import { message } from 'antd';
import Auth from "./pages/common/Auth";

let baseUrl=""
let req=axios.create({
    baseURL:baseUrl,
    headers: {
        "Authorization": "Bearer "+Auth.getJWT(),
        "Content-Type": 'application/json;charset=UTF-8',
        "Accept": "application/json"
    }
})

req.interceptors.response.use(
    function (response){
        if(response.headers["content-type"]!=='application/json'){
            window.location.reload();
        }
        return response;
    },
    function(error){
        let response = error.response;
        if(response){
            if( (response.status!==302)&&(response.data!==undefined)&&(response.data.error_message!==undefined)){
                message.error(response.data.error_message)
            }
            if( (response.status===302)&&(response.data!==undefined)&&(response.data.redirect_url!==undefined)  ){
                window.location.href=response.data.redirect_url;
            }
            if( (response.status===401)&&(response.data!==undefined)&&(response.data.redirect_url!==undefined)  ){
                window.location.href=response.data.redirect_url;
            }
            if( response.status >=500 ){
                message.error("请检查您的网络连接")
            }
        }
        throw error;
    }
);

export default{
    request:req,
    loginAPIURL:"/api/v1/login/",
    userAPIURL:"/api/v1/user/",
    centerAPIURL:"/api/v1/experimentalcenter/",

}


