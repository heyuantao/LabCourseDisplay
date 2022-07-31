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
             <Layout style={{ minHeight: "100vh" }}>
                    <SideBar></SideBar>
                    <Layout>
                        <PageHeader></PageHeader>
                        <LocationIndicator></LocationIndicator>
                        <Content style={{ margin: "0 10px" }}>
                            {this.props.children}
                        </Content>
                        <PageFooter></PageFooter>
                    </Layout>
                </Layout>
        );
    }
}
