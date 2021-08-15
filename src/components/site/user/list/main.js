import React, {
    Component, useState
} from 'react';
import { AppAPI } from '../../../../api/appApi';
import Tab1 from './tab/tab1';
import Tab2 from './tab/tab2';
import { Tabs, Space, Table, Divider, Button, Drawer, Row, Col, Form, Input, message, Spin, Select, Popconfirm, DatePicker, InputNumber } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import moment from 'moment';

const { TabPane } = Tabs;
const { Option } = Select;

const FormCreate: React.FC<CollectionCreateFromProps> = ({
    visible,
    onCreate,
    onClose,
    departmentState,
    visibleChildrenDrawer,
    onChildrenDrawerClose,
    account,
    detailtCustomerState,
    isCreate
}) => {
    const [form] = Form.useForm();
    form.resetFields();

    let title = "Thêm mới hồ sơ nhân viên";
    if (!isCreate) {
        title = "Chỉnh sửa hồ sơ nhân viên " + detailtCustomerState.name;
        if (detailtCustomerState.length != 0) {
            form.setFieldsValue({
                name: detailtCustomerState.name,
                phone: detailtCustomerState.phone,
                email: detailtCustomerState.email,
                description: detailtCustomerState.customer_info.description,
                gender: detailtCustomerState.gender.toString(),
                dateofbirth: detailtCustomerState.dateofbirth != null && moment(detailtCustomerState.dateofbirth, 'YYYY-MM-DD'),
                department: detailtCustomerState.department_connect.department._id,
                level: detailtCustomerState.customer_info.level,
                date_start_working: detailtCustomerState.customer_info.date_start_working != null && moment(detailtCustomerState.customer_info.date_start_working, 'YYYY-MM-DD'),
                salary: detailtCustomerState.customer_info.salary,
                salary_hold: detailtCustomerState.customer_info.salary_hold,
                salary_safe: detailtCustomerState.customer_info.salary_safe,
                time_salary_hold: detailtCustomerState.customer_info.time_salary_hold,
                fingerprint_code: detailtCustomerState.fingerprint_code
            });
        }
    }
    return (
        <Drawer
            title={title}
            width={500}
            visible={visible}
            onClose={onClose}
            bodyStyle={{ paddingBottom: 80 }}
            footer={
                <div
                    style={{
                        textAlign: 'right',
                    }}
                >
                    <Button type="primary" onClick={() => {
                        form
                            .validateFields()
                            .then(values => {
                                form.resetFields();
                                let value = values;
                                if (!isCreate && detailtCustomerState.length != 0) {
                                    value = Object.assign(values, { _id: detailtCustomerState._id });
                                }
                                onCreate(value);
                            });
                    }} htmlType="submit"> {isCreate ? "Thêm mới" : "Cập nhật"} </Button>

                    <Button
                        style={{ margin: '0 8px' }}
                        onClick={() => {
                            form.resetFields();
                        }}
                    >
                        Xoá
          </Button>
                </div>
            }>

            <Form layout="vertical" form={form}>
                <Row>
                    <Col span={24}>
                        <Form.Item
                            name="name"
                            label="Tên nhân viên"
                            rules={[{ required: true, message: 'Vui lòng nhập tên nhân viên' }]}
                        >
                            <Input placeholder="Tên nhân viên" />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <Form.Item
                            name="description"
                            label="Mô tả nhân viên"
                        >
                            <Input.TextArea placeholder="Team nhân viên, mô tả khi trùng tên nhân sự" rows={2} />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <Form.Item
                            name="phone"
                            label="Số điện thoại"
                        >
                            <Input placeholder="Số điện thoại" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="email"
                            label="Địa chỉ email"
                            style={{ width: 'calc(100% - 8px)', margin: '0 8px' }}
                        >
                            <Input placeholder="Địa chỉ email" />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <Form.Item
                            name="gender"
                            label="Giới tính"
                            rules={[{ required: true, message: 'Vui lòng nhập giới tính' }]}
                        >
                            <Select>
                                <Option value="1">Nam</Option>
                                <Option value="0">Nữ</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="dateofbirth"
                            label="Ngày sinh"
                            style={{ width: 'calc(100% - 8px)', margin: '0 8px' }}
                        >
                            <DatePicker className="w-100" />
                        </Form.Item>
                    </Col>
                </Row>

                <Divider orientation="left">Thông tin công việc</Divider>

                <Row>
                    <Col span={12}>
                        <Form.Item
                            name="department"
                            label="Phòng ban"
                            rules={[{ required: true, message: 'Vui lòng nhập phòng ban' }]}
                        >
                            <Select>
                                {departmentState}
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="level"
                            label="Chức vụ làm việc"
                            style={{ width: 'calc(100% - 8px)', margin: '0 8px' }}
                        >
                            <Input placeholder="Chức vụ làm việc" />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <Form.Item
                            name="date_start_working"
                            label="Ngày bắt đầu làm việc"
                            rules={[{ required: true, message: 'Vui lòng nhập ngày bắt đầu làm việc' }]}
                        >
                            <DatePicker className="w-100" />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <Form.Item
                            name="salary"
                            label="Mức lương"
                        >
                            <InputNumber formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} parser={value => value.replace(/\$\s?|(,*)/g, '')} placeholder="Mức lương" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="salary_safe"
                            label="Lương đóng bảo hiểm"
                            style={{ width: 'calc(100% - 8px)', margin: '0 8px' }}
                        >
                            <InputNumber formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} parser={value => value.replace(/\$\s?|(,*)/g, '')} placeholder="Lương đóng bảo hiểm" />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <Form.Item
                            name="salary_hold"
                            label="Lương giữ cọc"
                        >
                            <InputNumber formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} parser={value => value.replace(/\$\s?|(,*)/g, '')} placeholder="Lương giữ cọc" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="time_salary_hold"
                            label="Thời hạn giữ cọc"
                            style={{ width: 'calc(100% - 8px)', margin: '0 8px' }}
                        >
                            <Select>
                                <Option value="1">1 tháng</Option>
                                <Option value="2">2 tháng</Option>
                                <Option value="3">3 tháng</Option>
                                <Option value="4">4 tháng</Option>
                                <Option value="5">5 tháng</Option>
                                <Option value="6">6 tháng</Option>
                                <Option value="7">7 tháng</Option>
                                <Option value="8">8 tháng</Option>
                                <Option value="9">9 tháng</Option>
                                <Option value="10">10 tháng</Option>
                                <Option value="11">11 tháng</Option>
                                <Option value="12">12 tháng</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <Form.Item
                            name="fingerprint_code"
                            label="Mã chấm vân tay"
                        >
                            <InputNumber className="w-100" />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
            <Drawer
                title="Thông tin tài khoản"
                width={320}
                closable={false}
                onClose={onChildrenDrawerClose}
                visible={visibleChildrenDrawer}
            >
                <p>Tài khoản đăng nhập: <span className="fw-bold co-red">{account.username}</span></p>
                <p>Mật khẩu: <span className="fw-bold co-red">{account.password}</span></p>
            </Drawer>
        </Drawer>
    );
}

class Main extends Component {

    state = {
        loading: true,
        departmentState: [],
        account: [],
        dataState: [],
        listState: [],
        detailtCustomerState: []
    }
    closeForm = () => {
        this.props.toogleClickAdd(false);
        this.props.toogleClickEdit(false);
    }

    closeFormChild = () => {
        this.setState({
            visibleChildrenDrawer: false,
        });
    }

    onCreate = values => {
        AppAPI.createCustomer(values).then(res => {
            const { data } = res;
            if (data.success) {
                message.success(data.msg);
                if (data.data.isUpdate == null) {
                    this.setState({
                        visibleChildrenDrawer: true,
                        account: data.data
                    });
                }else{
                    this.closeForm();
                    this.loadData();
                }
            } else {
                message.error(data.msg);
            }
        }).catch(res => {
            message.error(res.message);
        })
    }

    componentDidMount() {
        this.loadData();
    }

    loadData() {
        this.props.setLoading(true);
        this.getDepartment(res => {
            this.resetData();
            this.getListCustomer();
        });
    }

    resetData() {
        this.setState({
            dataState: [],
            detailtCustomerState: [],
            rowId: null
        });
    }


    getColumnSearchProps = dataIndex => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div style={{ padding: 8 }}>
                <Input
                    ref={node => {
                        this.searchInput = node;
                    }}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{ width: 218, marginBottom: 8, display: 'block' }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 120 }}
                    >
                        Tìm kiếm
              </Button>
                    <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
                        Xoá
              </Button>
                </Space>
            </div>
        ),
        filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
        onFilter: (value, record) =>
            record[dataIndex] ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()) : '',
        onFilterDropdownVisibleChange: visible => {
            if (visible) {
                setTimeout(() => this.searchInput.select());
            }
        },
        render: text =>
            this.state.searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                    searchWords={[this.state.searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                    text
                ),
    });

    handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        this.setState({
            searchText: selectedKeys[0],
            searchedColumn: dataIndex,
        });
    };

    handleReset = clearFilters => {
        clearFilters();
        this.setState({ searchText: '' });
    };

    render() {
        const { dataState } = this.state;
        const columns = [
            {
                title: 'Mã nhân viên',
                width: 70,
                dataIndex: 'mns',
                key: 'mns',
                ...this.getColumnSearchProps('mns')
            },
            {
                title: 'Họ và tên',
                dataIndex: 'fullname',
                key: 'fullname',
                width: 150,
                ...this.getColumnSearchProps('fullname')
            },
            {
                title: 'Giới tính',
                dataIndex: 'gender',
                key: 'gender',
                width: 100
            },
            {
                title: 'Ngày sinh',
                dataIndex: 'dateofbirth',
                key: 'dateofbirth',
                width: 100
            },
            {
                title: 'Phòng ban',
                dataIndex: 'department',
                key: 'department',
                width: 150,
            },
            {
                title: 'Vị trí công việc',
                dataIndex: 'level',
                key: 'level',
                width: 150,
            },
            {
                title: 'Ngày bắt đầu làm việc',
                dataIndex: 'date_start_working',
                key: 'date_start_working',
                width: 100,
            }
        ];
        return (
            <section className="main-dashboard main-dashboard--layout flex-1">
                <Spin className="h-100" tip="Đang tải dữ liệu .." spinning={this.props.loading}>
                    <div className="d-flex flex-column h-100">
                        <Table scroll={{ y: 'calc(100vh - 419px)' }} style={{'minHeight': 'calc(100vh - 419px)'}} className="w-100 flex-1" pagination={false} dataSource={dataState} columns={columns}
                            onRow={(record, rowIndex) => {
                                return {
                                    onClick: event => {
                                        this.setState({
                                            rowId: record.mns
                                        });
                                        this.clickRow(record, rowIndex);
                                    },
                                };
                            }}
                            rowClassName={this.setRowClassName}
                        />
                        <UserDetail detailtCustomerState={this.state.detailtCustomerState} />
                    </div>
                    <FormCreate
                        visible={this.props.clickEdit || this.props.clickAdd}
                        onCreate={this.onCreate}
                        onClose={this.closeForm}
                        departmentState={this.state.departmentState}
                        visibleChildrenDrawer={this.state.visibleChildrenDrawer}
                        onChildrenDrawerClose={this.closeFormChild}
                        detailtCustomerState={this.state.detailtCustomerState}
                        account={this.state.account}
                        isCreate = {this.props.clickAdd == true ? true : false}
                    />
                </Spin>
            </section>
        );
    }

    setRowClassName = (record) => {
        return record.mns === this.state.rowId ? 'clickRowStyl' : '';

    }

    getDepartment = (callback) => {
        AppAPI.getDepartment().then(res => {
            const { data } = res;
            if (data.success) {
                data.data.map(res => {
                    let html = <Option key={res._id} value={res._id}>{res.department_name}</Option>
                    this.setState(prevState => ({
                        departmentState: [...prevState.departmentState, html]
                    }));
                });
            }
        }).finally(res => {
            callback();
        });
    }

    getListCustomer = () => {
        AppAPI.getListCustomer().then(res => {
            const { data } = res;
            const ObjectTest = {
                1: "Nam",
                0: "Nữ"
            }
            let des;
            if (data.success) {
                data.data.list.map(res => {
                    des = res.customer_info.description != "" && res.customer_info.description != null ? " (" + res.customer_info.description + ")" : ""
                    const obj = {
                        mns: data.data.prefix + res.customer_info.mns,
                        fullname: res.name + des,
                        dateofbirth: res.dateofbirth,
                        gender: ObjectTest[res.gender],
                        department: res.department_connect.department.department_name,
                        level: res.customer_info.level,
                        date_start_working: res.customer_info.date_start_working
                    };
                    this.setState(prevState => ({
                        dataState: [...prevState.dataState, obj]
                    }));
                });
                this.setState({
                    listState: data.data.list
                });
            }
        }).finally(res => {
            this.props.setLoading(false);
        });
    }


    clickRow = (record, index) => {
        this.props.toggleButtonEdit();
        this.props.setLoading(true);
        let customerID = this.state.listState[index]._id;
        this.props.activeCustomerId(customerID);
        AppAPI.getDetailtCustomer(customerID).then(res => {
            const { data } = res;
            if (data.success) {
                this.setState({
                    detailtCustomerState: data.data
                });
            } else {
                message.error(data.msg);
            }
        }).catch(res => {
            message.error(res.message);
        }).finally(res => {
            this.props.setLoading(false);
        });
    }
}

class UserDetail extends Component {
    render() {
        return (
            <div className="user_detail user_detail--layout p-5 box-sizing">
                <Tabs type="card" defaultActiveKey="1">
                    <TabPane tab="Thông tin chung" key="1">
                        <Tab1 detailtCustomerState={this.props.detailtCustomerState} />
                    </TabPane>
                    <TabPane tab="Thông tin tài khoản" key="2">
                        <Tab2 detailtCustomerState={this.props.detailtCustomerState} />
                    </TabPane>
                </Tabs>
            </div>
        );
    }
}


export default Main;