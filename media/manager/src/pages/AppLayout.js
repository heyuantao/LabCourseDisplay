import React from "react";
import {Router,Route,hashHistory,IndexRedirect} from "react-router";
import App from "./App";
import CenterPage from "./CenterPage";
import PersonalPage from "./PersonalPage";
import CoursePage from "./CoursePage";

export default class AppLayout extends React.Component{
    handleOnEnter(){

    }
    render(){
        return(
            <Router history={hashHistory} >
                <Route path="/" component={App}>
                    <IndexRedirect to="/center" ></IndexRedirect>
                    <Route path="/center/:cid/courses/" component={CoursePage} onEnter={this.handleOnEnter}></Route>
                    <Route path="/center" component={CenterPage} onEnter={this.handleOnEnter}></Route>
                    <Route path="/personal" component={PersonalPage} onEnter={this.handleOnEnter}></Route>
                </Route>
            </Router>
        );
    }
}
