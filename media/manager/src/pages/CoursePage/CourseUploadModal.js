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
}

export default CourseUploadModal