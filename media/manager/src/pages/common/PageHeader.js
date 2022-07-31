import React from "react";
import { Col, Row, Layout, Button  } from "antd";
import { connect } from "react-redux";
import "./index.css";
import * as UserActionCreator from "./store/UserActionCreator";

const { Header } = Layout;

class PageHeader extends React.Component {
    handleLogout(){
        this.props.logout()
    }
    componentDidMount() {
        this.props.getUser()
    }
    render() {
        //const user = this.props.user.get("user");
        return (
            <Header style={{ background: '#fff'}} >
                <Row type="flex" align="middle" justify="end">
                    <Col ><h3>管理员</h3>
                        <Button style={{marginLeft:"50px"}} onClick={()=>{this.handleLogout()}} type="primary">注销</Button>
                    </Col>
                </Row>
            </Header>
        )
    }
}

const mapStoreToProps = (store) => {
    return {
        //user:store.user,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getUser(){
            //dispatch(UserActionCreator.getUser())
        },
        logout(){
            //dispatch(UserActionCreator.logout())
        }
    }
}

export default connect(mapStoreToProps,mapDispatchToProps)(PageHeader)

