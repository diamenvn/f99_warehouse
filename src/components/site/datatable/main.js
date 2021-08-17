import React, {
    Component
} from 'react';

import { NavLink } from 'react-router-dom';
import { Table, Spin, Modal, Typography, Input, Button, message } from 'antd';


class Main extends Component {
    state = {
        modalVisible: false,
        collectionName: ""
    }
    render() {
        const { loading, dataSource, columnState, collection } = this.props;

        return (
            <section className="main-dashboard main-dashboard--layout overflow-auto flex-1">
                <Spin spinning={loading} tip="Đang tải dữ liệu">
                    <Table columns={columnState} dataSource={dataSource} pagination={false} size="middle" scroll={{ x: 'calc(700px + 50%)', y: 'calc(100vh - 330px)' }} />
                    <article className="main-dashboard__bottom p-5 d-flex justify-content-center">
                        {/* <Button className="mr-10" type="primary" danger>Xuất ra file Excel</Button> */}
                        <Button className="mr-10" type="primary" danger>Xuất ra API Json</Button>
                        <Button onClick={e => this.clickSaveCollection(e)} className="mr-10" type="primary">Lưu tệp khách hàng</Button>
                    </article>
                    <article className="main-dashboard__bottom">
                        <div className="keyword_suggest_wrapper">
                            <div className="keyword__container d-flex align-items-center">
                                <div className="keyword__label">Tệp khách hàng gợi ý: </div>
                                <div className="keyword__items d-flex flex-1 mx-10">
                                    {collection.map(item => (
                                        <a href={"/analytics/collection/" + item._id}  className="keyword__item">{item.text}</a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </article>
                </Spin>
                <Modal title="Lưu tệp khách hàng" onOk={this.handleOk} onCancel={this.handleCancel} visible={this.state.modalVisible}>
                    <Input value={this.state.collectionName} onChange={e => this.changeCollectionName(e)} placeholder="Nhập tên tệp khách hàng" />
                </Modal>
            </section>
        );
    }

    changeCollectionName = e => {
        this.setState({collectionName: e.target.value});
    }

    handleCancel = () => {
        this.setState({modalVisible: false});
    };

    handleOk = () => {
        if (this.state.collectionName == "") {
            message.error("Tên tệp khách hàng không được bỏ trống");
            return;
        }
        this.props.saveCollection(this.state.collectionName);
        this.setState({
            modalVisible: false
        });
    }

    clickSaveCollection = e => {
        this.setState({
            collectionName: "",
            modalVisible: true
        });
    }
}


export default Main;