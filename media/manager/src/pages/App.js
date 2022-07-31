import React from "react";
import { Layout } from "antd";
import SideBar from "./common/SideBar";
import PageHeader from "./common/PageHeader";
import PageFooter from "./common/PageFooter"
import LocationIndicator from "./common/LocationIndicator";

const { Content} = Layout;

export default class App extends React.Component{
    render(){
        return(
            <div>
                {this.props.children}
            </div>
        );
    }
}
