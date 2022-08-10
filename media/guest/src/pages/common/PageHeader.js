import React from "react";
import { Col, Row, Layout, Button, Menu } from "antd";
import { Link } from "react-router";
import { connect } from "react-redux";
import "./index.css";
import * as UserActionCreator from "./store/UserActionCreator";

const { Header } = Layout;

class PageHeader extends React.Component {
    handleMenuSelect(item){

    }
    handleLogout(){
        this.props.logout();
    }
    componentDidMount() {
        this.props.getUser();
    }
    render() {
        const user = this.props.user.get("user");
        return (
            <Header >
                <Row type="flex" justify="space-between" align="middle">
                    <Col>
                        <div className="HeadLogo">
                            课程展示系统
                        </div>
                    </Col>
                    <Col span={15} style={{float: "right"}}>
                        <Menu theme="dark" mode="horizontal" onSelect={(item)=>{this.handleMenuSelect(item)}} style={{lineHeight:"64px"}}>
                            <Menu.Item key="login" style={{float: "right"}}>
                                <Link to="/login">登录</Link>
                            </Menu.Item>
                            <Menu.Item key="query" style={{float: "right"}}>
                                    <Link to="/query">课程查询</Link>
                            </Menu.Item>
                            <Menu.Item key="display" style={{float: "right"}}>
                                    <Link to="/display">大屏展示</Link>
                            </Menu.Item>
                        </Menu>
                    </Col>
                </Row>
            </Header>
        )
    }
}

const mapStoreToProps = (store) => {
    return {
        user:store.user,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getUser(){
            dispatch(UserActionCreator.getUser())
        },
        logout(){
            dispatch(UserActionCreator.logout())
        }
    }
}

export default connect(mapStoreToProps,mapDispatchToProps)(PageHeader)

