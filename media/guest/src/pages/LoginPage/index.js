import React from "react";
import {connect} from "react-redux";
import {Row, Col, Form, Input, Button, Alert, Icon, Layout, Menu} from "antd";
import { Link,hashHistory } from "react-router";
import { fromJS } from "immutable";
import * as UserActionCreator from "../common/store/UserActionCreator"
import Utils from "../common/utils";
import Settings from "../../Settings";
import Auth from "../common/Auth";

import PageHeader from "../common/PageHeader";
import PageFooter from "../common/PageFooter";

const { Content } = Layout;
const FormItem = Form.Item;
const req = Settings.request;

class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            formData: fromJS({}),
            formFieldValidateInfo: "",
        }
    }

    handleLoginSubmit() {
        if (this.validateFormField() < 0) {
            return
        }
        req.post(Settings.loginAPIURL, this.state.formData.toJS()).then(function (response) {
            Auth.setJWT(response.data);
            Auth.displayJWT();
            if (response.data.redirect_url !== undefined) {
                window.location.href = response.data.redirect_url;
            }
        }).catch(function (error) {
        })

    }
    handleCancelSubmit(){
        hashHistory.push("/query");
    }

    validateFormField(){
        let formData = this.state.formData;
        this.setState({ formFieldValidateInfo: "" })

        if (!formData.get("username")) {
            this.setState({ formFieldValidateInfo: "用户名不能为空！" })
            return -1
        }
        if (!formData.get("password")) {
            this.setState({ formFieldValidateInfo: "请输入密码 ！" })
            return -1
        }
        if ( formData.get("username").length> 50) {
            this.setState({ formFieldValidateInfo: "用户名非法 ！" })
            return -1
        }
        return 1
    }

    handleFieldChange(value, field) {
        let dict = {}; dict[field] = value;
        let change = fromJS(dict);
        this.setState({ formData: this.state.formData.merge(change) }, () => { this.validateFormField() })
    }


    render() {
        const formData = this.state.formData;
        return (
            <Layout className="layout">
                <Content style={{background: '#fff',minHeight: "850px", padding: 0 }}>
                        <div style={{position: "absolute", width: "100%", top: "20%"}}>
                            <Row type="flex" justify="center" align="middle" style={{}}>
                                <Col md={{span: 8}}>
                                    <h1 style={{height: "60px",lineHeight: "60px",color: "black",textAlign: "center"}}>用户登录</h1>
                                </Col>
                            </Row>
                            <Row type="flex" justify="center" align="middle" style={{marginTop:"30px"}}>
                                <Col md={{span: 6}}>
                                    <Form className="login-form">
                                        <FormItem>
                                            <Input value={formData.get("username")} onChange={(e) => {
                                                this.handleFieldChange(e.target.value, "username")
                                            }}
                                                   prefix={<Icon type="user" style={{fontSize: 13}}/>} placeholder="请输入用户名"
                                                   size="large"/>
                                        </FormItem>
                                        <FormItem>
                                            <Input value={formData.get("password")} onChange={(e) => {
                                                this.handleFieldChange(e.target.value, "password")
                                            }}
                                                   prefix={<Icon type="lock" style={{fontSize: 13}}/>} type="password"
                                                   placeholder="请输入密码" size="large"/>
                                        </FormItem>
                                        <FormItem hasFeedback>
                                            {(this.state.formFieldValidateInfo !== "") &&
                                            <Alert message={this.state.formFieldValidateInfo} type="error"/>
                                            }
                                        </FormItem>
                                        <FormItem>
                                            <Row type="flex" justify="end" align="middle">
                                                <Button onClick={() => { this.handleCancelSubmit() }} className="login-form-button" style={{marginRight:10}}>
                                                    返回
                                                </Button>
                                                <Button type={this.state.formFieldValidateInfo === "" ? "primary" : "disabled"}
                                                    onClick={() => { this.handleLoginSubmit() }} className="login-form-button">
                                                    登录
                                                </Button>
                                            </Row>
                                        </FormItem>
                                    </Form>
                                </Col>
                            </Row>
                        </div>
                </Content>
                <PageFooter></PageFooter>
            </Layout>

        )
    }
}

const mapStoreToProps = (store) => {
    return{
        user:store.user,
    }
}

const mapDispatchToProps = (dispatch) => {
    return{   }
}

export default connect(mapStoreToProps,mapDispatchToProps)(LoginPage)
