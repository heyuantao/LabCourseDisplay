import React from "react";
import {Col, Row, Button} from "antd";
//import FileList from "./file_list";
//import FileAdd from "./file_add";
//import FileEdit from "./file_edit";

class CoursePage extends React.Component{
    constructor(props) {
        super(props);
        this.state= {mode:'list',id:0};
    }
    handleChangeModeAndInstanceId =(mode='list',id=0)=>{
        this.setState({mode:mode,id:id});
    }

    render() {
        return (
            <div style={{ padding: 24, background: "#fff"}}>
                <Row>
                    <h3>Course upload and display page</h3>
                </Row>
            </div>
        )
    }
}

export default CoursePage
