import React from "react";
import {connect} from "react-redux";
import {Row, Col, Form, Input, Button, Alert, Icon, Layout, Menu} from "antd";
import { Link,hashHistory } from "react-router";
import { fromJS } from "immutable";
import Settings from "../../Settings";
import Auth from "../common/Auth";


const { Content } = Layout;

class TodayCourseDisplay extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    render() {
        const formData = this.state.formData;
        return (
            <h1>Display</h1>
        )
    }
}

export default TodayCourseDisplay;