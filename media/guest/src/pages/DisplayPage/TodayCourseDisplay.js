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
        }
    }
    componentDidMount() {
        const centerUrl = Settings.centerAPIURL;
        req.get(centerUrl, {}).then((response) => { this.setState({ centers: fromJS(response.data) }) });
    }
    handleFieldChange(value, field) {
        let dict = {}; dict[field] = value;
        let change = fromJS(dict);
        this.setState({ formData: this.state.formData.merge(change) });
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
        const formData = this.state.formData;
        return (
            <Content style={{background: '#fff',minHeight: "850px", padding: 10 }}>
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