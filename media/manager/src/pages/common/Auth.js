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
    const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjU5NzAxNjIyLCJqdGkiOiI3Mjk2NjVhMjAzYjc0NmVjYTczZjBiMjcwMTc1NDllOSIsInVzZXJfaWQiOjF9._HqSgtmZ_1o8p9cB1cpe5NGGZydb5kSPNyjOfKLUgA4";
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