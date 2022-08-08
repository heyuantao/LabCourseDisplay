import React from "react";
import { Layout } from "antd";

const { Content} = Layout;

export default class App extends React.Component{
    render(){
        return(
            <Layout style={{ minHeight: "100vh" }}>
                    <Layout>
                        <Content>
                            {this.props.children}
                        </Content>
                    </Layout>
             </Layout>
        );
    }
}
