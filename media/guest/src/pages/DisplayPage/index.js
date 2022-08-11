import React from "react";
import {Layout} from "antd";
import DisplayPageHeader from "./DisplayPageHeader";
import PageFooter from "../common/PageFooter";
import TodayCourseDisplay from "./TodayCourseDisplay";

const { Content } = Layout;

class DisplayPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    render() {
        return (
            <Layout className="layout">
                <DisplayPageHeader></DisplayPageHeader>
                <TodayCourseDisplay></TodayCourseDisplay>
                <PageFooter></PageFooter>
            </Layout>
        )
    }
}

export default DisplayPage;