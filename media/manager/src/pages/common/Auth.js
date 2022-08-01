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
    const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjU5MzE4MDg0LCJqdGkiOiJjMmFkZWMyNjJlN2I0ZjlmYTc4OTA0NjQwMDFkMjU3YiIsInVzZXJfaWQiOjF9.c4jCC5aBwy6LhzPchPPwpaQbGoD-5pDi7MSkLckVqiI";
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