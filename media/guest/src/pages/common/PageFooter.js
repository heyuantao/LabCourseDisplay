import React from "react";
import {Layout} from "antd";

const { Footer } = Layout;

export default class PageFooter extends React.PureComponent {
    render() {
        return (
            <Footer style={{ textAlign:"center",padding: 10 }}>
                郑州航空工业管理学院/智能工程学院
            </Footer>
        )
    }
}