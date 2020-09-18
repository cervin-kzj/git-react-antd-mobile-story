import React, { Component } from "react";
import { FootMenu } from "../../components/FootMenu";
import HeadMenu from "../../components/HeadMenu";
import { requestStoryDetail } from "../../util/request";
import md from "../../store/index"
export class Detail extends Component {
    constructor() {
        super()
        this.state = {
            id: "",
            content: "",
            title: ""
        }
    }
    componentWillMount() {
        try {
            let obj = {}
            let arrUrl = this.props.location.search.slice(1).split("&");
            arrUrl.forEach((item, index) => {
                let arr = item.split("=");
                obj[arr[0]] = arr[1];
            });
            if (md.state.detail.id != this.props.match.params.id) {
                this.setState({
                    title: obj.title,
                    id: this.props.match.params.id
                }, () => {
                    requestStoryDetail({ id: this.state.id }).then((resolve) => {
                        this.setState({
                            content: resolve.data.showapi_res_body.content
                        }, () => {
                            md.dis.dispatch({
                                type: "setDetail",
                                payload: { id: this.state.id, content: this.state.content, title: this.state.title }
                            })
                        })
                    })
                })
            } else {
                let { id, content, title } = md.state.detail;
                this.setState({
                    id,
                    content,
                    title
                });
            }
        }
        catch (e) {
            throw new Error(e);
        }
    }
    render() {
        return (
            <div className="detailWrap">
                <HeadMenu title={decodeURI(this.state.title)}></HeadMenu>
                <div style={{ marginTop: 45, padding: 5 }}>{this.state.content}</div>
                <FootMenu></FootMenu>
            </div>
        )
    }
}