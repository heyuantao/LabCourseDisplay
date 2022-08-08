import React from "react";
import {connect} from "react-redux";
import {Row, Col, Form, Input, Button, Alert, Icon, Layout, Menu} from "antd";
import { Link,hashHistory } from "react-router";
import PageHeader from "../common/PageHeader";
import PageFooter from "../common/PageFooter";
import CourseList from "./CourseList";

class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return(
            <Layout className="layout">
                <PageHeader></PageHeader>
                <CourseList></CourseList>
                <PageFooter></PageFooter>
            </Layout>
        )
    }
}

export default HomePage;