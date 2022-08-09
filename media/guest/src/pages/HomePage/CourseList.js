import React from "react";
import {connect} from "react-redux";
import {fromJS} from "immutable";
import {Row, Col, Form, Input, Button, Alert, Icon, Layout, Menu, Table, Select} from "antd";
import { Link,hashHistory } from "react-router";
import Settings from "../../Settings";
const { Content } = Layout;
const req = Settings.request;

class CourseList extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            formData: fromJS({center:0}),
            centers:fromJS([]),
            pagination: fromJS({total: 0, pageSize: 8, current: 1}),
            fetching: false,
            tableData: fromJS([]),
        }
    }
    componentDidMount() {
        const centerUrl = Settings.centerAPIURL;
        req.get(centerUrl, {}).then((response) => { this.setState({ centers: fromJS(response.data) }) });
    }
    handleTableChange(pagination, filters, sorter){
        let newPagination=fromJS(pagination)
        this.setState({pagination:newPagination},()=>{this.fetchTableData()})
    }
    handleFieldChange(value, field) {
        let dict = {}; dict[field] = value;
        let change = fromJS(dict);
        this.setState({ formData: this.state.formData.merge(change) })
    }
    tableColumnFormat() {
        const tableColumn = [
            { title: "上课时间", dataIndex: "course_date", key: "course_date" },
            { title: "周次", dataIndex: "course_week_order", key: "course_week_order" },
            { title: "节次", dataIndex: "course_period", key: "course_period" },
            { title: "房间", dataIndex: "lab", key: "lab" },
            { title: "实验课名称", dataIndex: "experimental_name", key: "experimental_name" },
            { title: "实验名称", dataIndex: "experimental_item", key: "experimental_item" },
            { title: "实验项目代码", dataIndex: "experimental_code", key: "experimental_code" },
            { title: "上课教师", dataIndex: "teacher", key: "teacher" },
            { title: "学生专业", dataIndex: "student_subject", key: "student_subject" },
            { title: "学生人数", dataIndex: "student_count", key: "student_count" }
        ];
        return tableColumn;
    }
    render() {
        let formData = this.state.formData;
        return (
            <Content style={{background: '#fff',minHeight: "850px", padding: 10 }}>
                <Row type="flex" justify="space-around" align="middle">
                    <Col span={22}>
                        <Select value={formData.get("center")}  onChange={(v) => { this.handleFieldChange(v, "center") }}  style={{ width: 200 }}>
                            <Select.Option key={0} value={0}>全部</Select.Option>
                            {
                               this.state.centers.map(function (obj) {
                                  return <Select.Option key={obj.get("id")} value={obj.get("id")}>{obj.get("name")}</Select.Option>
                               })
                            }
                        </Select>
                        <Button type="primary" style={{marginLeft:20}} onClick={()=>{}}>选择</Button>
                    </Col>
                </Row>
                <Row type="flex" justify="space-around" align="middle">
                    <Col span={22}>
                        <div style={{ marginBottom: "15px" }}></div>
                        <Table dataSource={this.state.tableData.toJS()} rowKey="id" pagination={this.state.pagination.toJS()}
                            onChange={(pagination, filters, sorter)=>{this.handleTableChange(pagination, filters, sorter)}}
                            //   expandedRowRender={record => <p style={{ margin: 0 }}>备注:{record.comments} 考生编号:{record.examinee_id}</p>}
                            columns={this.tableColumnFormat()} loading={this.state.fetching}>
                        </Table>
                    </Col>
                </Row>
            </Content>
        )
    }
}
export default CourseList