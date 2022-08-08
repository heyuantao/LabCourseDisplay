import React from "react";
import {Router,Route,hashHistory,IndexRedirect} from "react-router";
import App from "./App";
import LoginPage from "./LoginPage";
import HomePage from "./HomePage";

export default class AppLayout extends React.Component{
    handleOnEnter(){

    }
    render(){
        return(
            <Router history={hashHistory} >
                <Route path="/" component={App}>
                    <IndexRedirect to="/home" ></IndexRedirect>
                    <Route path="/login" component={LoginPage} onEnter={(s,r)=>(this.handleOnEnter(s,r))}></Route>
                    <Route path="/home" component={HomePage} onEnter={(s,r)=>(this.handleOnEnter(s,r))}></Route>
                </Route>
            </Router>
        );
    }
}
