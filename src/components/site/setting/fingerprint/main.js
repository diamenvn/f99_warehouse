import React, {
    Component
} from 'react';
import { FcAddDatabase, FcEmptyTrash } from 'react-icons/fc';
import { AiFillDelete } from 'react-icons/ai';
import { Tabs, Table, Button, Drawer, Row, Col, Form, Input, message, Spin, Tag, Popconfirm } from 'antd';
import { AppAPI } from '../../../../api/appApi';

const { TabPane } = Tabs;

const columns = [
    {
        title: 'STT',
        dataIndex: 'stt',
        key: 'stt',
        width: 50
    },
    {
        title: 'API Gửi data',
        dataIndex: 'api_value',
        key: 'api_value',
        width: 500
    },
    {
        title: 'Ngày tạo API',
        dataIndex: 'created_at',
        key: 'created_at',
        width: 150
    },
    {
        title: 'Trạng thái',
        dataIndex: 'status',
        key: 'status',
        width: 150
    },
    {
        title: 'Thao tác',
        dataIndex: 'action',
        key: 'action',
        width: 150
    },
];

class Main extends Component {
    state = {
        loading: false,
        listDeviceState: [],
        emptyData: true,
        nameDeviceState: "",
        loading: false
    }

    componentDidMount() {
        this.fetchDataFromAPI();
    }

    render() {
        const empty = (
            <h3><FcEmptyTrash />Không có máy chấm công nào, bạn hãy thêm máy mới để bắt đầu sử dụng</h3>
        );
        const { listDeviceState, emptyData, nameDeviceState, loading } = this.state;
        const { clickAdd } = this.props;
        return (
            <section className="main-dashboard main-dashboard--layout flex-1">
                {!emptyData ?
                    <div className="card-container">
                        <Spin spinning={loading} tip="Loading...">
                            <Tabs type="card">
                                {listDeviceState}
                            </Tabs>
                        </Spin>
                    </div> :
                    <div className="d-flex p-10">
                        {empty}
                    </div>
                }
                <Drawer
                    title="Thêm máy chấm công"
                    width={300}
                    visible={clickAdd}
                    onClose={this.onClose}
                    bodyStyle={{ paddingBottom: 80 }}
                    footer={
                        <div
                            style={{
                                textAlign: 'right',
                            }}
                        >
                            <Button type="primary" onClick={(e) => this.addDevice(e)}>
                                Thêm mới
                            </Button>
                        </div>
                    }>
                    <Row>
                        <Col span={24}>
                            <Form.Item
                                name="name"
                                label="Tên máy chấm công"
                                rules={[{ required: true, message: 'Please enter user name' }]}
                            >
                                <Input value={nameDeviceState} onChange={(e) => this.changeNameDevice(e)} placeholder="Nhập tên máy chấm công vào đây" />
                            </Form.Item>
                        </Col>
                    </Row>
                </Drawer>
            </section>

        );

    }

    fetchDataFromAPI = () => {
        AppAPI.getAllDevice().then(res => {
            const { data } = res;
            var key = 0;
            if (data.success) {
                data.data.map(res => {
                    key += 1;
                    let apiKey = 0;
                    let dataSource = [];
                    res.api.map(resAPI => {
                        apiKey += 1;
                        let object = {
                            stt: apiKey,
                            api_value: AppAPI.BASE_URL + "/api/v1/device/pushDataFromFingerprint/" + resAPI.access_token,
                            created_at: resAPI.created_at,
                            status: resAPI.status == 1 ? <Tag color="#87d068">Đang hoạt động</Tag> : <Tag color="#f50">Đã tạm dừng</Tag>,
                            action: <AiFillDelete onClick={(e) => this.removeItemApi(resAPI)} className="icon--hover-red" />
                        }
                        dataSource.push(object);
                    });

                    const obj = (
                        <TabPane tab={res.device_name} key={key} >
                            <Table locale="Bạn chưa tạo API nào để kết nối" pagination={false} dataSource={dataSource} columns={columns} />
                            <div className="bottom p-5">
                                <Popconfirm onConfirm={(e) => this.removeDevice(res)} title="Bạn có chắc chắn muốn xoá？" okText="Đồng ý" cancelText="Huỷ bỏ">
                                    <Button className="px-5" type="primary" danger><FcAddDatabase />Xoá máy chấm công</Button>
                                </Popconfirm>
                                <Button className="ml-10" onClick={(e) => this.addApi(res)} type="primary"><FcAddDatabase />Thêm mới API</Button>
                            </div>
                        </TabPane>
                    );
                    this.setState(prevState => ({
                        listDeviceState: [...prevState.listDeviceState, obj]
                    }));
                });
                if (data.data.length > 0) {
                    this.setState({ emptyData: false });
                }
            }
        });
    }

    addDevice = e => {
        const { nameDeviceState } = this.state;
        if (!!!nameDeviceState) {
            message.error("Vui lòng nhập tên thiết bị!");
            return;
        }

        let data = {
            name: nameDeviceState
        };
        AppAPI.addDevice(data).then(res => {
            const { data } = res;
            if (data.success) {
                message.success(data.msg);
                window.location.reload();
            } else {
                message.error(data.msg);
            }
        }).catch(res => {
            message.error(res.message);
        });
    }

    addApi = e => {
        let data = {
            _id: e._id
        };
        AppAPI.addApiReciverData(data).then(res => {
            const { data } = res;
            if (data.success) {
                message.success(data.msg);
                window.location.reload();
            } else {
                message.error(data.msg);
            }
        }).catch(res => {
            message.error(res.message);
        });
    }

    removeDevice = (e) => {
        let data = {
            _id: e._id
        };
        AppAPI.removeDevice(data).then(res => {
            const { data } = res;
            if (data.success) {
                message.success(data.msg);
                window.location.reload();
            } else {
                message.error(data.msg);
            }
        }).catch(res => {
            message.error(res.message);
        });
    }

    removeItemApi = (e) => {
        let data = {
            _id: e._id,
            device_id: e.device_id
        };
        AppAPI.removeItemAPI(data).then(res => {
            const { data } = res;
            if (data.success) {
                message.success(data.msg);
                window.location.reload();
            } else {
                message.error(data.msg);
            }
        }).catch(res => {
            message.error(res.message);
        });
    }

    changeNameDevice = e => {
        this.setState({
            nameDeviceState: e.target.value
        });
    }

    onClose = () => {
        this.props.toogleClickAdd();
    };
}


export default Main;