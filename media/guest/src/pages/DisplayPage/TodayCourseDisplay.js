import React from "react";
import {connect} from "react-redux";
import {Row, Col, Form, Input, Button, Alert, Icon, Layout, Menu, Select, DatePicker, Table, Progress,InputNumber } from "antd";
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
            displayRatio: 0,
            pageSize: 15,
        }
    }
    componentDidMount() {
        const centerUrl = Settings.centerAPIURL;
        //const page_size = 16;
        let current_page = 1;
        let total_item;
        let total_page;
        req.get(centerUrl, {}).then((response) => { this.setState({ centers: fromJS(response.data) }) });

        this.displayTimer = setInterval(() => {
            let page_size = this.state.pageSize;
            total_item = this.state.tableData.size;
            total_page = Math.ceil(total_item/page_size);
            if(current_page>total_page){
                current_page=1;
            }
            this.repeatDisplayContent(current_page,page_size,total_item);
            current_page=current_page+1;
        }, 5000);
        this.loadDataTimer = setInterval(()=>{this.fetchTableData();},10000);
    }
    componentWillUnmount() {
        clearInterval(this.displayTimer);
        clearInterval(this.loadDataTimer);
    }
    repeatDisplayContent(current_page,page_size,total_item){
        let display_content = fromJS([]);
        let begin = (current_page-1)*page_size;
        let end = (current_page)*page_size;
        const ratio = Math.floor(current_page/(total_item/page_size)*100)
        if(end>total_item){
            end=total_item;
        }
        display_content= this.state.tableData.slice(begin,end);
        this.setState({"displayTableData":display_content});
        this.setState({"displayRatio":ratio});

    }
    handleFieldChange(value, field) {
        let dict = {}; dict[field] = value;
        let change = fromJS(dict);
        this.setState({ formData: this.state.formData.merge(change) },()=>{this.fetchTableData()});
    }
    handlePageSizeChange(value){
        this.setState({"pageSize":value});
    }
    fetchTableData() {
        const apiURL = Settings.todayCourseAPIURL;
        const center_id = this.state.formData.get("center_id");
        //if(center_id==0){
        //    return 0;
        //}
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
                        <Row type="flex" justify="space-between" align="middle">
                            <Col>
                                <Form  layout="inline">
                                    <Form.Item label={"实验中心"}>
                                        <Select value={formData.get("center_id")}  onChange={(v) => { this.handleFieldChange(v, "center_id") }}  style={{ width: 200 }}>
                                            <Select.Option key={0} value={0}>所有实验中心</Select.Option>
                                            {
                                               this.state.centers.map(function (obj) {
                                                  return <Select.Option key={obj.get("id")} value={obj.get("id")}>{obj.get("name")}</Select.Option>
                                               })
                                            }
                                        </Select>
                                    </Form.Item>
                                    <Form.Item label={"每页最大显示行数"} >
                                        <InputNumber min={5} max={20} value={this.state.pageSize} onChange={(v)=>{this.handlePageSizeChange(v)}}/>
                                    </Form.Item>
                                </Form>
                            </Col>
                            <Col span={5}>
                                <Progress percent={this.state.displayRatio} size="small" status="normal" />
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Row type="flex" justify="space-around" align="middle">
                    <Col span={22}>
                        <div style={{ marginBottom: "15px" }}></div>
                        <Table dataSource={this.state.displayTableData.toJS()} rowKey="id"  columns={this.tableColumnFormat()}
                            pagination={false}>
                        </Table>
                    </Col>
                </Row>
            </Content>
        )
    }
}

export default TodayCourseDisplay;
