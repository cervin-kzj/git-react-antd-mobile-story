import React, { Component } from "react";
import { Carousel } from 'antd-mobile';
import "./Index.css";

export class Index extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: ['0', '1', '2'],
            imgHeight: 'auto',
        }
    }
    componentWillUnmount() {
    }
    render() {
        return (
            <div className="indexWrap">
                <div className="banner">
                    <Carousel
                        autoplay={true}
                        autoplayInterval="1000"
                        infinite
                        beforeChange={(from, to) => {
                            if (from === 2) {
                                this.props.history.push('/storytype');
                            }
                        }}
                    // beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
                    // afterChange={index => console.log('slide to', index)}
                    >
                        {this.state.data.map(val => (
                            <a
                                key={val}
                                href="http://www.alipay.com"
                                style={{ display: 'inline-block', width: '100%', height: "4rem" }}
                            >
                                <img
                                    src={require(`../../assets/image/${val}.jpg`)}
                                    alt=""
                                    style={{ width: '100%', verticalAlign: 'top', height: '100%' }}
                                    onLoad={() => {
                                        // fire window resize event to change height
                                        window.dispatchEvent(new Event('resize'));
                                        this.setState({ imgHeight: 'auto' });
                                    }}
                                />
                            </a>
                        ))}
                    </Carousel>
                    {/* <div className="timer">
                        <span className="second">1s</span><span>跳过广告</span>
                    </div> */}
                </div>
                <div className="welcome">
                    欢迎光临童话故事
                </div>
            </div>
        )
    }
}