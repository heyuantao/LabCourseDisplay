import React from "react";
import {Router,Route,hashHistory,IndexRedirect} from "react-router";
import App from "./App";
import CoursePage from "./CoursePage";

export default class AppLayout extends React.Component{
    handleOnEnter(){
    }
    render(){
        return(
            <Router history={hashHistory} >
                <Route path="/" component={App}>
                    <IndexRedirect to="/courses" ></IndexRedirect>
                    <Route path="/courses" component={CoursePage} onEnter={this.handleOnEnter}></Route>

                </Route>
            </Router>
        );
    }
}
