import React, {
    Component
} from 'react';
import Header from './header';
import Main from './main';
import Detail from './detail';
import './style.sass';
import { message, Button } from 'antd';
import { AppAPI } from '../../../api/appApi';

class Analytics extends Component {
    state = {
        columnState: [{
            title: '#',
            width: 90,
            dataIndex: 'id',
            key: 'id',
            fixed: 'left',
        }],
        dataSource: [],
        loading: true,
        params: [],
        page: 1,
        lastPage: 1,
        currentPage: 1,
        detailId: null,
        collection: [],
        visibleDetail: false,
        id: this.props.match.params.id,
        filter: [],
        textFilterBy: [
            { text: 'Tên khách hàng', key: 'customer_name' },
            { text: 'Số điện thoại', key: 'customer_phone' },
            { text: 'Mua theo sản phẩm', key: 'products' },
            { text: 'Số lần mua hàng', key: 'count_buy' },
            { text: 'Tỉnh thành, Quận huyện', key: 'customer_address' },
            { text: 'Công ty chi nhánh', key: 'sale_branch' },
            { text: 'Thời gian mua', key: 'date' },
        ],
    }

    componentDidMount() {
        this.fetchColumn();
        this.loadMoreData();
        this.getCollection();
        this.detailCollection();
    }

    render() {
        let { loading, dataSource, columnState, textFilterBy, filter } = this.state;
        return (
            <div className="d-flex flex-column h-100">
                <Header updateFilter={this.updateFilter} filter={filter} textFilterBy={textFilterBy} updateDataTable={this.updateDataTable} />
                <Main collection={this.state.collection} loading={loading} saveCollection={this.saveCollection} dataSource={dataSource} columnState={columnState} />
                <Detail id={this.state.detailId} hideDetail={this.hideDetail} visibleDetail={this.state.visibleDetail} />
            </div>
        );
    }

    saveCollection = (text) => {
        let params = {
            'text': text,
            'filter': this.state.params
        };
        AppAPI.saveCollection(params).then(res => {
            const { data } = res;
            if (data.success) {
                message.success(data.msg);
            }else{
                message.error(data.msg);
            }
        });
    }

    updateDataTable = (arrayFilter) => {
        let params = arrayFilter;
        document.querySelector('.ant-table-body').scrollTop = "0px";
        this.setState(prevState => ({
            page: 1,
            params: [...prevState.params, params]
        }), function () {
            this.fetchListDataFromAPI(this.state.params);
        });
    }

    fetchListDataFromAPI = (params = '', append = false) => {
        this.setState({ loading: true });
        let page = this.state.page;
        AppAPI.getAllData(params, page).then(res => {
            const { data } = res;
            var stt = 0;
            if (append) {
                if (data.success) {
                    data.data.rows.map(res => {
                        stt += 1;
                        let obj = res;
                        this.setState(prevState => ({
                            dataSource: [...prevState.dataSource, obj]
                        }));
                    });
                }
            }else{
                this.setState({
                    dataSource: []
                }, function () {
                    if (data.success) {
                        data.data.rows.map(res => {
                            stt += 1;
                            let obj = res;
                            Object.assign(obj, {detail: <Button onClick={e => this.openDetail(true, res.id)} type="primary">Xem</Button>})
                            this.setState(prevState => ({
                                dataSource: [...prevState.dataSource, obj]
                            }));
                        });
                    }
                });
            }

            if (data.success) {
                this.setState(prevState => ({
                    lastPage: data.data.last_page,
                    currentPage: data.data.current_page
                }));
            }
            

        }).finally(res => {
            this.setState({ loading: false });
        })
    }

    fetchColumn = () => {
        AppAPI.getAllColumn().then(res => {
            const { data } = res;
            var stt = 0;
            if (data.success) {
                data.data.map(res => {
                    stt += 1;

                    const obj = {
                        title: res.title,
                        dataIndex: res.name,
                        key: res.name,
                        width: res.width ?? 250,
                        fixed: res.fixed ?? 'none'
                    };

                    if (res.show || typeof res.show == "undefined") {
                        this.setState(prevState => ({
                            columnState: [...prevState.columnState, obj]
                        }));
                    }

                });

                this.setState({
                    columnState: [...this.state.columnState, {
                        title: 'Chi tiết',
                        width: 90,
                        dataIndex: 'detail',
                        key: 'detail',
                        fixed: 'right'
                    }]
                });
            } else {
                message.error(data.msg);
            }
            return true;
        });
    }

    loadMoreData = () => {
        var tableContent = document.querySelector('.ant-table-body')
        tableContent.addEventListener('scroll', (event) => {
            let maxScroll = event.target.scrollHeight - event.target.clientHeight
            let currentScroll = event.target.scrollTop
            if (currentScroll === maxScroll && this.state.currentPage < this.state.lastPage) {
                this.setState({
                    loading: true,
                    page: this.state.page + 1
                }, function() { 
                    this.fetchListDataFromAPI(this.state.params, true)
                });
            }
        })
    }

    getCollection = () => {
        AppAPI.getCollection().then(res => {
            const { data } = res;
            if (data.success) {
                this.setState({
                    collection: data.data
                });
            }
        });
    }

    detailCollection = () => {
        if (!!this.state.id) {
            AppAPI.getDetailCollection(this.state.id).then(res => {
                const { data } = res;
                let obj;let arr = [];

                if (data.success) {
                    data.data.filter.map(res => {
                        let filterIs = res[1].replace("is", 'là').replace('equal', 'có chứa').replace('start', 'bắt đầu là').replace('end', 'kết thúc là');

                        this.state.textFilterBy.map(item => {
                            if (item.key == res[0]) {
                                obj = {'text': item.text + " " +filterIs + " " + res[2]};
                                arr.push(obj);
                            }
                        });
                    });
                    this.setState({
                        filter: arr,
                        params: data.data.filter
                    }, this.fetchListDataFromAPI(data.data.filter));
                }
            });
        }else{
            this.fetchListDataFromAPI();
        }
    }

    updateFilter = (obj) => {
        this.setState(prevState => ({
            filter: [...prevState.filter, obj]
        }));
    }

    openDetail = (bool, id) => {
        this.setState({
            visibleDetail: bool,
            detailId: id
        });
    }

    hideDetail = () => {
        this.setState({
            visibleDetail: false
        });
    }

}

export default Analytics;