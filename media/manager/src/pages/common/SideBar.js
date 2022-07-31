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
                if(location.pathname.includes("/examination")){
                    if(location.pathname.includes("/enrollment")){
                        that.setState({selectedKeys:["11"]});
                        this.props.changeLocation(fromJS(["考试管理","考试安排","报名情况"]));
                        return;
                    }
                    that.setState({selectedKeys:["11"]});
                    this.props.changeLocation(fromJS(["考试管理","考试安排"]));
                    return;
                }
                if(location.pathname.includes("/userenrollment")){
                    that.setState({selectedKeys:['12']});
                    this.props.changeLocation(fromJS(["考试管理","报名信息"]));
                    return;
                }
                if(location.pathname.includes("/externalexam")){
                    that.setState({selectedKeys:['22']});
                    this.props.changeLocation(fromJS(["成绩管理","外部考试"]));
                    return;
                }
                if(location.pathname.includes("/account")){
                    that.setState({selectedKeys:['31']});
                    this.props.changeLocation(fromJS(["账号管理","考生账号"]));
                    return;
                }
                if(location.pathname.includes("/personal")){
                    that.setState({selectedKeys:["41"]});
                    this.props.changeLocation(fromJS(["个人管理","密码修改"]));
                    return;
                }
                if(location.pathname.includes("/examcategory")){
                    that.setState({selectedKeys:["51"]});
                    this.props.changeLocation(fromJS(["系统设置","考试类别"]));
                    return;
                }
                if(location.pathname.includes("/managercategory")){
                    that.setState({selectedKeys:["52"]});
                    this.props.changeLocation(fromJS(["系统设置","管理员分类"]));
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
                            <Link to="/examination">
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