import React from "react";
import {Router,Route,hashHistory,IndexRedirect} from "react-router";
import App from "./App";
import LoginPage from "./LoginPage";
import QueryPage from "./QueryPage";
import DisplayPage from "./DisplayPage";

export default class AppLayout extends React.Component{
    handleOnEnter(){

    }
    render(){
        return(
            <Router history={hashHistory} >
                <Route path="/" component={App}>
                    <IndexRedirect to="/query" ></IndexRedirect>
                    <Route path="/login" component={LoginPage} onEnter={(s,r)=>(this.handleOnEnter(s,r))}></Route>
                    <Route path="/query" component={QueryPage} onEnter={(s,r)=>(this.handleOnEnter(s,r))}></Route>
                    <Route path="/display" component={DisplayPage} onEnter={(s,r)=>(this.handleOnEnter(s,r))}></Route>
                </Route>
            </Router>
        );
    }
}
