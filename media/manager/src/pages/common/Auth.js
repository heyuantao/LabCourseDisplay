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
    const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjU5NzI0NTE4LCJqdGkiOiI5ZmM2MWYxYjkyZjQ0YmJjYTAzYjRiZWQzMjJmZGIwNCIsInVzZXJfaWQiOjF9.BEqef749B4Ylc1Go3GXEx9NTVSdsr5bqvEZs1VsyjYI";
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