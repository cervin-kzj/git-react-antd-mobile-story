import React, { Component } from "react";
import { Grid } from 'antd-mobile';
import "./Type.css";
import { FootMenu } from "../../components/FootMenu";
import { requestStoryType } from "../../util/request";
import md from "../../store/index"
export class Type extends Component {
    constructor(props) {
        super(props);
        this.state = {
            storylist: []
        }
    }
    componentWillMount() {
        try {
            if (md.state.storyTypeList.storylist != undefined) {
                this.setState({
                    storylist:md.state.storyTypeList.storylist
                })
            }
            else {
                requestStoryType().then((resolve) => {
                    let { storylist } = resolve.data.showapi_res_body;
                    this.setState({
                        storylist
                    }, () => {
                        md.dis.dispatch({
                            type: "setStoryTypeList",
                            payload: { storylist }
                        });
                    })
                })
            }
        }
        catch (e) {
            throw new Error(e);
        }
    }
    /**
     * 儿童小故事跳转故事列表页
     * @param {*} classify eg:"1"
     * @param {*} classifyId eg:"儿童小故事"
     */
    jumpUrl(classify, classifyId) {
        this.props.history.push(`/storylist/${classifyId}?classify=${classify}`)
    }
    render() {
        let { storylist } = this.state
        return (
            <div className="typeWrap" style={{ backgroundImage: 'url("https://www.zhaoyunuo.net/1.jpg")' }}>
                <div className="container">
                    <Grid data={storylist}
                        columnNum={2}
                        square={false}
                        renderItem={dataItem => (
                            <div className="gridItem" onClick={this.jumpUrl.bind(this, dataItem.classify, dataItem.classifyId)}>
                                <span>{dataItem.classify}</span>
                            </div>
                        )}
                    />
                </div>
                <FootMenu></FootMenu>
            </div>
        )
    }
}