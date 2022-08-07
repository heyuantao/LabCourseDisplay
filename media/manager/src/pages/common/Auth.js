import Settings from "../../Settings";

function getJWT(){
    var token = localStorage.getItem('access_token');
    if(token === null){
        return token;
    }else{
        return "";
    }
}

function getTestJWT(){
    const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjU5ODkwMDc1LCJqdGkiOiJkNjI5NjA2MjJkYjg0NGI4YmUwNjZkYjNmZjBkNGU4NiIsInVzZXJfaWQiOjF9.gDR_O3GiLyk0H90ktFalpR7HSM4WnxR4sdsOwEuF4lc";
    return token;
}

function setJWT(tokenObject) {
    localStorage.setItem('access_token', tokenObject.access);
    localStorage.setItem('refresh_token', tokenObject.refresh)
}


export default{
    getJWT:getJWT,
    setJWT:setJWT,
    getTestJWT:getTestJWT,
}