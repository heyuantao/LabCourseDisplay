import React from "react";
import {Col, Row, Button} from "antd";
import Auth from "../common/Auth";
import CenterListPage from "./CenterListPage";

class CenterPage extends React.Component{
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div style={{ padding: 24, background: "#fff" }}>
                <CenterListPage></CenterListPage>
            </div>
        )
    }
}

export default CenterPage
