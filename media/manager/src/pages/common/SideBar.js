import React from "react";
import { hashHistory,Link } from "react-router";
import { Icon, Layout, Menu } from "antd";
import {connect} from "react-redux";
import {fromJS} from "immutable";
import * as LocationActionCreator from "./store/LocationIndicatorActionCreator";
const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;

class SideBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedKeys:["1"],
        }
    }
    componentDidMount(){
        let that = this;
        hashHistory.listen( (location) =>  {
            if(location.action==="PUSH"){
                if(location.pathname.includes("/course")){
                    that.setState({selectedKeys:['11']});
                    this.props.changeLocation(fromJS(["课程管理","课程列表"]));
                    return;
                }
                if(location.pathname.includes("/personal")){
                    that.setState({selectedKeys:["21"]});
                    this.props.changeLocation(fromJS(["个人管理","密码修改"]));
                    return;
                }
            }
        });
    }
    render() {
        //const user = this.props.user.get("user");
        //let isSuperuser = false;
        //if((user.get("is_superuser")===true)&&(user.get("category")==='超级管理员')){
        //    isSuperuser = true;
        //}
        return (
            <Sider width="230">
                <div className="logo" style={{textAlign:"center"}} >
                    <h1 style={{color:"white"}}>实验室课程展示</h1>
                </div>
                <Menu theme="dark" defaultSelectedKeys={["1"]} defaultOpenKeys={["sub1"]}
                      selectedKeys={this.state.selectedKeys} mode="inline">
                    <SubMenu key="sub1" title={<span><Icon type="pie-chart" /><span>课程管理</span></span>}>
                        <Menu.Item key="11">
                            <Link to="/course">
                                <Icon type="schedule" /><span>课程列表</span>
                            </Link>
                        </Menu.Item>
                    </SubMenu>
                    <SubMenu key="sub4" title={<span><Icon type="setting" /><span>系统设置</span></span>}>
                        <Menu.Item key="21">
                            <Link to="/personal">
                                <Icon type="key" /><span>密码修改</span>
                            </Link>
                        </Menu.Item>
                    </SubMenu>
                </Menu>

            </Sider>
        );
    }
}

const mapStoreToProps = (store) => {
    return {
        user:store.user,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        changeLocation(locationList){
            dispatch(LocationActionCreator.changeLocation(locationList))
        }
    }
}

export default connect(mapStoreToProps,mapDispatchToProps)(SideBar)