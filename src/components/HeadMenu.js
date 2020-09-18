import React, { Component } from "react";
import { NavBar, Icon } from 'antd-mobile';
import { withRouter } from "react-router-dom";

class HeadMenu extends Component {
    constructor(props) {
        super(props)
    }
    goBack() {
        this.props.history.go(-1)
    }
    render() {
        return (
            <NavBar
                mode="light"
                icon={<Icon type="left" />}
                onLeftClick={() => { this.goBack() }}
            >{this.props.title}</NavBar>
        )
    }
}
export default withRouter(HeadMenu)