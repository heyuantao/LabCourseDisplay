import React from "react";
import {Col, Row, Button, Layout} from "antd";
import SideBar from "../common/SideBar";
import PageHeader from "../common/PageHeader";
import LocationIndicator from "../common/LocationIndicator";
import PageFooter from "../common/PageFooter";
import PersonalSubPage from "./PersonalSubPage";
const { Content} = Layout;

class CoursePage extends React.Component{
    render(){
        return(
             <Layout style={{ minHeight: "100vh" }}>
                    <SideBar></SideBar>
                    <Layout>
                        <PageHeader></PageHeader>
                        <LocationIndicator></LocationIndicator>
                        <Content style={{ margin: "0 10px" }}>
                            <PersonalSubPage></PersonalSubPage>
                        </Content>
                        <PageFooter></PageFooter>
                    </Layout>
                </Layout>
        );
    }
}

export default CoursePage
