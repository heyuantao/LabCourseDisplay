import React from "react";
import {Col, Row, Button} from "antd";
import Auth from "../common/Auth";
import CourseListPage from "./CourseListPage";

class CoursePage extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            center_id: props.params.cid,
            mode: "list",
        }

    }
    handleChangeModeAndInstanceId =(mode='list',id=0)=>{
        this.setState({mode:mode,id:id});

    }

    render() {
        return (
            <div style={{ padding: 24, background: "#fff" }}>
                <div className={this.state.mode === "list" ? "" : "hidden"}>

                </div>
                <CourseListPage center_id={this.state.center_id}></CourseListPage>
            </div>
        )
    }
}

export default CoursePage
