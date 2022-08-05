import React from "react";
import {fromJS} from "immutable";
import {hashHistory, Link} from "react-router";
import {Col, Row, Button, Table} from "antd";
import Settings from "../../Settings";
const req = Settings.request;

class CenterListPage extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            fetching: false,
            tableData: fromJS([]),
        }

    }
    componentDidMount() {
        this.fetchTableData()
    }
    fetchTableData() {
        const url = Settings.centerAPIURL;
        req.get(url,{}).then((response)=>{
            let data = fromJS(response.data);
            this.setState({tableData:data});
        }).catch((error)=>{
        })
    }
    tableColumnFormat() {
        const tableColumn = [
            { title: "序号", dataIndex: "id", key: "id" },
            { title: "实验中心", dataIndex: "name", key: "name" },
            { title: "实验次数", dataIndex: "count", key: "count"},
            {
                title: "中心课程查看", key: "action",
                render: (text, record) =>(
                    <div>
                        <Link to={"/center/" + record.id + "/course/"}>点击查看</Link>
                    </div>
                )
            },
        ];
        return tableColumn;
    }
    render() {
        return (
            <div>
                <Row type="flex" justify="center" align="middle">
                    <Col span={24}>
                        <div style={{ marginBottom: "15px" }}></div>
                        <Table dataSource={this.state.tableData.toJS()} rowKey="id"
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

export default CenterListPage
