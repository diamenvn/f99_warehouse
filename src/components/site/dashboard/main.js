import React, {
    Component
} from 'react';

import { Table, Spin, message, Popover, Tabs } from 'antd';
import { AppAPI } from '../../../api/appApi';

const { TabPane } = Tabs;
const columns = [
    {
        title: 'Mã nhân sự',
        width: 120,
        dataIndex: 'hrcode',
        key: 'hrcode',
        fixed: 'left',
    },
    {
        title: 'Họ và tên',
        dataIndex: 'fullname',
        key: 'fullname',
        width: 250,
        fixed: 'left',
    },
    {
        title: 'Vị trí công việc',
        dataIndex: 'level',
        key: 'level',
        width: 300,
    }
];

class Main extends Component {
    state = {
        loading: true,
        fingerLog: "",
        dataSource: [],
        prefixName: "",
        columnState: [
            {
                title: 'MNS',
                width: 90,
                dataIndex: 'hrcode',
                key: 'hrcode',
                fixed: 'left',
            },
            {
                title: 'Họ và tên',
                dataIndex: 'fullname',
                key: 'fullname',
                width: 200,
                fixed: 'left',
            },
            {
                title: 'Vị trí công việc',
                dataIndex: 'level',
                key: 'level',
                width: 250
            }]
    }
    componentDidMount() {
        this.fetchColumn();
        this.fetchPrefixName();
        this.fetchDataFromAPI();
    }

    render() {
        const data = [];
        const { loading, dataSource, columnState, prefixName } = this.state;

        return (
            <section className="main-dashboard main-dashboard--layout overflow-auto flex-1">
                <Spin spinning={loading} tip="Đang tải dữ liệu">
                    <Table columns={columnState} dataSource={dataSource} pagination={false} bordered scroll={{ x: 1500, y: 'calc(100vh - 179px)' }} 
                        
                    />
                </Spin>
            </section>
        );
    }

    fetchDataFromAPI = () => {
        AppAPI.getAllTimeKeeping().then(res => {
            const { data } = res;
            var stt = 0;
            var finger = "";
            if (data.success) {
                data.data.map(res => {
                    stt += 1;
                    var dayStt = 0;
                    var department = res.department != null ? res.department.department_name : "[Không có]";
                    let obj = {
                        stt: stt,
                        fullname: <span className="fw-600 fs-15">{res.name}</span>,
                        hrcode: this.state.prefixName + res.customerInfo.mns,
                        level: res.department != null ? res.department.department_name : "" 
                    };

                    res.timekeeping.data.forEach(day => {
                        dayStt += 1;
                        const delay = (
                            day.log.in_out.checkin.delay != 0 ? <span className="co-red fw-bold"> - {day.log.in_out.checkin.delay}</span> : ""
                        );
                        const earlier = (
                            day.log.in_out.checkout.earlier != 0 ? <span className="co-red fw-bold"> - {day.log.in_out.checkout.earlier}</span> : ""
                        );

                        const content = (
                            <Tabs>
                                <TabPane tab="Tổng hợp" key="1">
                                    <div>Công làm việc trong ngày: <span className="fw-bold">{day.log.work}</span></div>
                                    <div>Thuộc phòng ban: <span>{department}</span></div>
                                    <div>Ca làm việc: <span>Fulltime</span></div>
                                    <div>Giờ làm việc: <span>09:00 - 17:30</span></div>
                                    <div className="fw-bold">Giờ vào: <span>{day.log.in_out.checkin.time}</span>{day.log.in_out.checkin.delay != 0 && <span className="co-red fw-bold"> - Đi muộn: <span>{day.log.in_out.checkin.delay}</span></span>}</div>
                                    <div className="fw-bold">Giờ ra: <span>{day.log.in_out.checkout.time}</span>{day.log.in_out.checkout.earlier != 0 && <span className="co-red fw-bold"> - Về sớm: <span>{day.log.in_out.checkout.earlier}</span></span>}</div>
                                </TabPane>
                                <TabPane tab="Chốt vân tay" key="2">
                                    {day.log.fingerprint.map(finger => {
                                        return <div className="border-bottom-dashed p-5">Chấm vân tay lúc: <span className="fw-bold co-red">{finger.datetime_at}</span></div>
                                    })}
                                </TabPane>
                                <TabPane tab="Đơn từ" key="3">
                                    <span>Không có đơn nào</span>
                                </TabPane>
                                <TabPane tab="Phạt" key="4">
                                    <span>Không bị phạt</span>
                                </TabPane>
                            </Tabs>
                        );


                        const html = (
                            <Popover content={content} placement="bottom" trigger="click" title={res.name.toUpperCase() + ", NGÀY " + day.day + "/" + res.timekeeping.month}>
                                <div className="border-bottom-dashed">{day.log.in_out.checkin.time}{delay}</div>
                                <div className="border-bottom-dashed">{day.log.in_out.checkout.time}{earlier}</div>
                            </Popover>
                        );

                        if (day.off) {
                            obj[dayStt] = <div className="text-center co-blue fw-bold">N</div>;
                        } else {
                            obj[dayStt] = html;
                        }


                    });


                    this.setState(prevState => ({
                        dataSource: [...prevState.dataSource, obj]
                    }));
                });
            } else {
                message.error(data.msg);
            }
        }).catch(res => {
            console.log(res.message);
        }).finally(res => {
            this.setState({ loading: false });
        });
    }

    fetchColumn = () => {
        AppAPI.getAllColumn().then(res => {
            const { data } = res;
            var stt = 0;
            if (data.success) {
                data.data.dayInMonth.map(res => {
                    stt += 1;
                    const obj = {
                        title: res.day + "/" + data.data.month + " " + res.dayOfWeek,
                        dataIndex: res.day,
                        key: res.day,
                        width: 170,
                    };
                    this.setState(prevState => ({
                        columnState: [...prevState.columnState, obj]
                    }));
                });
            } else {
                message.error(data.msg);
            }
            return true;
        }).catch(res => {
            return false;
        });
    }

    fetchPrefixName = () => {
        AppAPI.getPrefixName().then(res => {
            const { data } = res;
            var stt = 0;
            if (data.success) {
                this.setState({ prefixName: data.data });
            } else {
                message.error(data.msg);
            }
            return true;
        }).catch(res => {
            return false;
        });
    }
}


export default Main;