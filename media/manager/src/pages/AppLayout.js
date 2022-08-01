import React from "react";
import {Router,Route,hashHistory,IndexRedirect} from "react-router";
import App from "./App";
import CoursePage from "./CoursePage";
import PersonalPage from "./PersonalPage";
import LoginPage from "./LoginPage";

export default class AppLayout extends React.Component{
    handleOnEnter(){
    }
    render(){
        return(
            <Router history={hashHistory} >
                <Route path="/" component={App}>
                    <IndexRedirect to="/course" ></IndexRedirect>
                    <Route path="/course" component={CoursePage} onEnter={this.handleOnEnter}></Route>
                    <Route path="/personal" component={PersonalPage} onEnter={this.handleOnEnter}></Route>
                </Route>
            </Router>
        );
    }
}
