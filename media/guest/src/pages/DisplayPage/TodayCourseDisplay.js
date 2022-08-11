import React from "react";
import {connect} from "react-redux";
import {Row, Col, Form, Input, Button, Alert, Icon, Layout, Menu, Select, DatePicker, Table} from "antd";
import { Link,hashHistory } from "react-router";
import { fromJS } from "immutable";
import Settings from "../../Settings";
const req = Settings.request;

const { Content } = Layout;

class TodayCourseDisplay extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            center_id:0,
            formData: fromJS({center_id:0}),
            centers:fromJS([]),
            fetching: false,
            tableData: fromJS([]),
            displayTableData: fromJS([]),
        }
    }
    componentDidMount() {
        const centerUrl = Settings.centerAPIURL;
        let current_page = 0;
        const page_size = 10;
        const total_page = Math.floor(this.state.tableData.size/page_size);
        req.get(centerUrl, {}).then((response) => { this.setState({ centers: fromJS(response.data) }) });
        this.interval = setInterval(() => {
            if(current_page>total_page){
                current_page=0;
            }
            this.repeatDisplayContent(current_page,page_size);
            current_page=current_page+1;
        }, 2000);
    }
    componentWillUnmount() {
        clearInterval(this.interval);
    }
    repeatDisplayContent(current_page,page_size){
        const count = this.state.tableData.size;
        console.log("current page !");
        console.log(current_page);
    }
    handleFieldChange(value, field) {
        let dict = {}; dict[field] = value;
        let change = fromJS(dict);
        this.setState({ formData: this.state.formData.merge(change) },()=>{this.fetchTableData()});
    }
    fetchTableData() {
        const apiURL = Settings.todayCourseAPIURL;
        const center_id = this.state.formData.get("center_id");
        if(center_id==0){
            return 0;
        }
        let url = apiURL+center_id+"/todaycourse/";
        this.setState({fetching:true});
        req.get(url).then((response)=>{
            const tableData = fromJS(response.data);
            this.setState({tableData:tableData});
            this.setState({fetching:false});
        }).catch((error)=>{
            this.setState({fetching:false});
        })
    }
    tableColumnFormat() {
        const tableColumn = [
            { title: "实验课名称", dataIndex: "experimental_name", key: "experimental_name" },
            { title: "实验名称", dataIndex: "experimental_item", key: "experimental_item" },
            { title: "实验室", dataIndex: "lab", key: "lab" },
            { title: "节次", dataIndex: "course_period", key: "course_period" },
            { title: "上课教师", dataIndex: "teacher", key: "teacher" },
            { title: "学生专业", dataIndex: "student_subject", key: "student_subject" },
            { title: "学生人数", dataIndex: "student_count", key: "student_count" }
        ];
        return tableColumn;
    }
    render() {
        const formData = this.state.formData;
        return (
            <Content style={{background: '#fff',minHeight: "850px", padding: "10px"}}>
                <Row type="flex" justify="space-around" align="middle">
                    <Col span={22}>
                        <Form  layout="inline">
                            <Form.Item label={"实验中心"}>
                                <Select value={formData.get("center_id")}  onChange={(v) => { this.handleFieldChange(v, "center_id") }}  style={{ width: 200 }}>
                                    <Select.Option key={0} value={0}>未选择</Select.Option>
                                    {
                                       this.state.centers.map(function (obj) {
                                          return <Select.Option key={obj.get("id")} value={obj.get("id")}>{obj.get("name")}</Select.Option>
                                       })
                                    }
                                </Select>
                            </Form.Item>
                        </Form>
                    </Col>
                </Row>
                <Row type="flex" justify="space-around" align="middle">
                    <Col span={22}>
                        <div style={{ marginBottom: "15px" }}></div>
                        <Table dataSource={this.state.tableData.toJS()} rowKey="id"  columns={this.tableColumnFormat()} loading={this.state.fetching}>
                        </Table>
                    </Col>
                </Row>
            </Content>
        )
    }
}

export default TodayCourseDisplay;