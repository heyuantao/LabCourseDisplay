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
    const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjU5OTM1ODk1LCJqdGkiOiJlYTlkZmQ3NDViZjY0ZjExOWJhNTg5MjQxYTYxZGVjOSIsInVzZXJfaWQiOjF9.n72IWFHGEVaZiYt1ISR722enaF-UGx_b7JUPmjnLehI";
    return token;
}


function clearJWT() {
    console.log("Clear JWT in Auth.js");
    localStorage.setItem('access_token', "");
    localStorage.setItem('refresh_token', "")
}

function setJWT(tokenObject) {
    localStorage.setItem('access_token', tokenObject.access);
    localStorage.setItem('refresh_token', tokenObject.refresh)
}

function displayJWT(){
    console.log("access_token:"+localStorage.getItem('access_token'));
    console.log("refresh_token:"+localStorage.getItem('refresh_token'));
}

export default{
    getJWT:getJWT,
    setJWT:setJWT,
    clearJWT:clearJWT,
    getTestJWT:getTestJWT,
    displayJWT:displayJWT,
}