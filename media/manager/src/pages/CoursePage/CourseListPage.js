import React from "react";
import {fromJS} from "immutable";
import {Col, Row, Button, Table} from "antd";
import * as LocationActionCreator from "../common/store/LocationIndicatorActionCreator";
import {connect} from "react-redux";

class CourseListPage extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            pagination: fromJS({total: 0, pageSize: 8, current: 1}),
            fetching: false,
            tableData: fromJS([]),
            uploadModalVisiable:false,
        }

    }
    //componentWillReceiveProps(props){
    //    this.fetchTableData();
    //}
    componentDidMount() {
        this.props.changeLocation(fromJS(["课程管理","实验中心","实验中心课程"]));
        this.fetchTableData()
    }
    fetchTableData() {
        const center_id = this.props.center_id;
        console.log("Fetch Data !");
        console.log(center_id);
    }
    tableColumnFormat() {
        const tableColumn = [
            { title: "上课时间", dataIndex: "course_date", key: "course_date" },
            { title: "节次", dataIndex: "course_period", key: "course_period" },
            { title: "周次", dataIndex: "course_week_order", key: "course_week_order" },
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
        return (
            <div>
                <Row type="flex" justify="center" align="middle">
                    <Col span={24}>
                        <div style={{ marginBottom: "15px" }}></div>
                        <Table dataSource={this.state.tableData.toJS()} rowKey="id" pagination={this.state.pagination.toJS()}
                            //onChange={(pagination, filters, sorter)=>{this.handleTableChange(pagination, filters, sorter)}}
                            //   expandedRowRender={record => <p style={{ margin: 0 }}>备注:{record.comments} 考生编号:{record.examinee_id}</p>}
                            columns={this.tableColumnFormat()} loading={this.state.fetching}>
                        </Table>
                    </Col>
                </Row>
            </div>
        )
    }
}

const mapStoreToProps = (store) => {
    return {
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        changeLocation(locationList){
            dispatch(LocationActionCreator.changeLocation(locationList))
        }
    }
}

export default connect(mapStoreToProps,mapDispatchToProps)(CourseListPage)
