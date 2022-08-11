import React from "react";
import { Col, Row, Layout, Button, Menu } from "antd";
import { Link } from "react-router";
import { connect } from "react-redux";
import "../../index.css";

const { Header } = Layout;

class DisplayPageHeader extends React.Component {
    handleMenuSelect(item){

    }
    render() {
        return (
            <Header >
                <Row type="flex" justify="space-between" align="middle">
                    <Col >
                        <div className="HeadLogo">
                            实验中心当日课程
                        </div>
                    </Col>
                    <Col span={15} style={{float: "right"}}>
                        <Menu theme="dark" mode="horizontal" onSelect={(item)=>{this.handleMenuSelect(item)}} style={{lineHeight:"64px"}}>
                            <Menu.Item key="login" style={{float: "right"}}>
                                <Link to="/">退出该页面</Link>
                            </Menu.Item>
                        </Menu>
                    </Col>
                </Row>
            </Header>
        )
    }
}


export default DisplayPageHeader

