import React from "react";
import {fromJS} from "immutable";
import {Col, Row, Button, Table} from "antd";

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
        this.fetchTableData()
    }
    fetchTableData() {
        const center_id = this.props.center_id;
        console.log("Fetch Data !");
    }
    tableColumnFormat() {
        const tableColumn = [
            { title: "上课时间", dataIndex: "course_date", key: "course_date" },
            { title: "节次", dataIndex: "course_period", key: "course_period" },
            { title: "周次", dataIndex: "course_week_order", key: "course_week_order" },
            { title: "房间", dataIndex: "lab", key: "lab" },
            { title: "实验课名称", dataIndex: "experimental_name", key: "experimental_name" },
            { title: "统考专业", dataIndex: "unified_exam_type", key: "unified_exam_type" },
            { title: "考试成绩", dataIndex: "final_score", key: "final_score" },
            { title: "考试排名", dataIndex: "final_score_order", key: "final_score_order" },
            { title: "是否合格", dataIndex: "qualified", key: "qualified" }
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

export default CourseListPage
