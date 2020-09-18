import React, { Component } from "react";
import { withRouter } from "react-router-dom"
import "./List.css";
import { FootMenu } from "../../components/FootMenu";
import HeadMenu from "../../components/HeadMenu";
import { SwipeAction, ListView, PullToRefresh, Toast } from 'antd-mobile';
import { requestStoryList } from "../../util/request";
import querystring from "querystring";
import CacheRoute, { dropByCacheKey, getCachingKeys } from 'react-router-cache-route'

class List extends Component {
    constructor(props) {
        super(props)
        props.cacheLifecycles.didCache(this.componentDidCache)
        props.cacheLifecycles.didRecover(this.componentDidRecover)
        // 创建ListViewDataSource对象
        const dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2 // rowHasChanged(prevRowData, nextRowData); 用其进行数据变更的比较
        })
        this.state = {
            dataSource,
            datas: [],
            pageNo: 1,
            pageSize: 2,
            hasMore: true,
            refreshing: true,
            isLoading: true,
            dataArr: [],
            classifyId: 0,
            classify: ""
        }
    }
    componentDidMount() {
        this.setState({
            classifyId: this.props.match.params.classifyId,
            classify: querystring.parse(this.props.history.location.search.slice(1)).classify
        }, () => {
            this.getData(true)
        })
    }
    componentDidCache = () => {
        if(this.props.location.pathname=="/storytype"){
            dropByCacheKey('ListComponent')
        }
        // console.log('List cached', "被缓存",getCachingKeys());
    }
    componentDidRecover = () => {
        // console.log('List recovered', "被恢复")
    }
    getData(ref = false) {
        //获取数据
        requestStoryList({
            classifyId: this.state.classifyId,
            page: this.state.pageNo,
        }).then((resolve) => {
            const dataList = resolve.data.showapi_res_body.contentlist;
            const len = dataList.length;
            if (len <= 0) { // 判断是否已经没有数据了
                this.setState({
                    refreshing: false,
                    isLoading: false,
                    hasMore: false
                })
                Toast.info('没有数据了~', 1)
                return false
            }
            if (ref) {
                //这里表示刷新使用
                // 下拉刷新的情况，重新添加数据即可(这里等于只直接用了第一页的数据)
                this.setState({
                    pageNo: this.state.pageNo,
                    dataSource: this.state.dataSource.cloneWithRows(dataList), // 数据源中的数据本身是不可修改的,要更新datasource中的数据，请（每次都重新）调用cloneWithRows方法
                    hasMore: true, // 下拉刷新后，重新允许开下拉加载
                    refreshing: false, // 是否在刷新数据
                    isLoading: false, // 是否在加载中
                    dataArr: dataList // 保存数据进state，在下拉加载时需要使用已有数据
                })
            } else {
                // 这里表示上拉加载更多
                // 合并state中已有的数据和新增的数据
                var dataArr = this.state.dataArr.concat(dataList) //关键代码
                this.setState({
                    pageNo: this.state.pageNo,
                    dataSource: this.state.dataSource.cloneWithRows(dataArr), // 数据源中的数据本身是不可修改的,要更新datasource中的数据，请（每次都重新）调用cloneWithRows方法
                    refreshing: false,
                    isLoading: false,
                    dataArr: dataArr // 保存新数据进state
                })
            }
        });
    }

    // 下拉刷新
    onRefresh = () => {
        this.setState({
            refreshing: true,
            isLoading: true,
            pageNo: 1 // 刷新嘛，一般加载第一页，或者按你自己的逻辑（比如每次刷新，换一个随机页码）
        }, () => {
            this.getData(true)
        })
    }

    // 滑动到底部时加载更多
    onEndReached = (event) => {
        // 加载中或没有数据了都不再加载
        if (this.state.isLoading || !this.state.hasMore) {
            return
        }
        this.setState({
            isLoading: true,
            pageNo: this.state.pageNo + 1, // 加载下一页
        }, () => {
            this.getData(false)
        })
    }

    jumpDetail(id, title) {
        this.props.history.push(`/storydetail/${id}?title=${title}`)
    }

    render() {
        const row = (rowData, sectionID, rowID) => {
            return (
                <div key={rowID}>
                    <SwipeAction
                        autoClose
                        right={[
                            {
                                text: '查看',
                                onPress: () => this.jumpDetail(rowData.id, rowData.title),
                                style: { backgroundColor: '#F4333C', color: 'white' },
                            },
                        ]}
                    // onOpen={() => console.log('global open')}
                    // onClose={() => console.log('global close')}
                    >
                        <div
                            style={{
                                lineHeight: '50px',
                                color: '#888',
                                fontSize: 18,
                                borderBottom: '1px solid #F6F6F6',
                                padding: '0 15px'
                            }}
                        >{rowData.title}</div>
                    </SwipeAction>
                </div>
            )
        }
        return (
            <div className="listWrap">
                <HeadMenu title={this.state.classify}></HeadMenu>
                <div style={{ marginTop: 45 }}>
                    <ListView
                        ref={el => this.lv = el}
                        dataSource={this.state.dataSource}
                        renderFooter={() => (<div className="footer">{this.state.isLoading ? '加载中...' : '暂无更多数据'}</div>)}
                        renderRow={row}
                        useBodyScroll
                        pullToRefresh={<PullToRefresh
                            refreshing={this.state.refreshing}
                            onRefresh={this.onRefresh}
                        />}
                        onEndReachedThreshold={10}
                        onEndReached={this.onEndReached}
                        pageSize={5}
                    />
                </div>
                <FootMenu></FootMenu>
            </div>
        )
    }
}
export default withRouter(List);