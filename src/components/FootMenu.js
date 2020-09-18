import React, { Component } from "react"
import { TabBar } from 'antd-mobile';

export class FootMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 'redTab',
            hidden: false,
            fullScreen: true,
        };
        this.icon = {
            active_type: require("../assets/image/indexFull.png"),
            inactive_type: require("../assets/image/index.png"),
            active_mine: require("../assets/image/myFull.png"),
            inactive_mine: require("../assets/image/my.png"),
        };
    }
    render() {
        return (
            <div style={this.state.fullScreen ? { position: 'fixed', width: '100%', bottom: -1, zIndex: 1 } : null}>
                <TabBar
                    unselectedTintColor="#000"
                    tintColor="#07c160"
                    barTintColor="white"
                    hidden={this.state.hidden}
                >
                    <TabBar.Item
                        icon={{ uri: this.icon.inactive_type }}
                        selectedIcon={{ uri: this.icon.active_type }}
                        title="故事分类"
                        key="故事分类"
                        selected={this.state.selectedTab === 'redTab'}
                        onPress={() => {
                            this.setState({
                                selectedTab: 'redTab',
                            });
                        }}
                    >
                    </TabBar.Item>
                    <TabBar.Item
                        icon={{ uri: this.icon.inactive_mine }}
                        selectedIcon={{ uri: this.icon.active_mine }}
                        title="我的"
                        key="我的"
                        selected={this.state.selectedTab === 'yellowTab'}
                        onPress={() => {
                            this.setState({
                                selectedTab: 'yellowTab',
                            });
                        }}
                    >
                    </TabBar.Item>
                </TabBar>
            </div>
        )
    }
}