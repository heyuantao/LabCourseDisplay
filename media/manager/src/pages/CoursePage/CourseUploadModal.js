import React from "react";
import propTypes from "prop-types";
import {Upload, Modal, Icon, Button, message} from 'antd';
import Settings from "../../Settings";

const req = Settings.request;

class CourseUploadModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalVisible: this.props.visible,
            fileList: [],
        }
    }
    componentWillReceiveProps(props){
        this.setState({modalVisible:props.visible});
    }
    handleFileUploadChange(status){
        console.log(status);
    }
    handleBeforeUpload(file){
        const fileList = [file];
        this.setState({fileList:fileList});
        return false;
    }
    uploadTemplate(){
        const url = this.props.action;
        console.log("Upload !");
        let formData = new FormData();
        if(this.state.fileList.length>0){
            formData.append("file",this.state.fileList[0]);
        }
        req.post(url,formData).then(function(response){
            message.success("上传完成 !");
            //this.setState({modalVisible:false});
            this.props.close();
        }.bind(this)).catch(function(error){
        }.bind(this))
    }
    handleHideModal(){
        this.props.close();
    }
    modalFooterContent(){
        return(
            <div>
                <Button  onClick={()=>{this.uploadTemplate()}}>上传</Button>
                <Button type="primary" onClick={()=>{this.handleHideModal()}}>关闭</Button>
            </div>
        )
    }
    render(){
        return (
            <div>
                <Modal title="文件上传（上传后将覆盖原有实验中心数据）" visible={this.state.modalVisible}  footer={ this.modalFooterContent() } onCancel={()=>{this.handleHideModal()}}>
                    <Upload action={this.props.action} beforeUpload={(file)=>(this.handleBeforeUpload(file))} showUploadList={true}
                            onChange={(status)=>{this.handleFileUploadChange(status)}} fileList={this.state.fileList}>
                         <Button>
                             <Icon type="upload" /> 选择文件
                        </Button>
                    </Upload>
                </Modal>
            </div>
        )
    }
}

export default CourseUploadModal