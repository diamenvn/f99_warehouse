import React, {
    Component, useState
} from 'react';
import { Button, Popover, Input, Form, message, Spin } from 'antd';
import { UserAPI } from '../../../../../api/auth/userApi';
import  Global from '../../../../../contains/global';

const layout = {
    labelCol: { span: 10 },
    wrapperCol: { span: 14 },
};
const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};

const finish = value => {
    if (value.password != value.renewpass) {
        message.error("Nhập lại mật khẩu không khớp");
        return;
    }

    let source = {'_id': Global.init()._id};
    const returnedTarget = Object.assign(value, source);

    UserAPI.changePass(returnedTarget).then(res => {
        let { data } = res;
        if (data.success) {
            message.success(data.msg);
        } else {
            message.error(data.msg);
        }
    }).catch(res => {
        message.error(res.message);
    });
}

const DataTab: React.FC<CollectionCreateFromProps> = ({
    detailtCustomerState
}) => {
    Global.add({'key': '_id', 'value': detailtCustomerState._id});
    const content = (
        <Spin spinning={false}>
            <Form
            {...layout}
            name="basic"
            initialValues={{ remember: true }}
            onFinish={finish}
            >


                <Form.Item
                    label="Mật khẩu mới"
                    className="text-left"
                    name="password"
                    rules={[{ required: true, message: 'Vui lòng nhập' }]}
                >
                    <Input type="password" />
                </Form.Item>
                <Form.Item
                    label="Nhập lại"
                    className="text-left"
                    name="renewpass"
                    rules={[{ required: true, message: 'Vui lòng nhập' }]}
                >
                    <Input type="password" />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Hoàn thành
                    </Button>
                </Form.Item>
            </Form>
        </Spin>
    );
    const forgetPass = (
        <Popover title="Lấy lại mật khẩu" content={content} trigger="click">
            <Button type="primary">Lấy lại mật khẩu</Button>
        </Popover>
    );
    return (
        detailtCustomerState._id != null ?
        <div className="d-flex p-5">
            <div className="col-12">
                <p className="d-flex"><span className="d-block col-2">Tài khoản: </span> <span className="fw-bold">{detailtCustomerState.username}</span></p>
                <p className="d-flex"><span className="d-block col-2">Mật khẩu:</span> {forgetPass}</p>
                <p className="d-flex"><span className="d-block col-2">Đăng nhập lần cuối:</span> <span className="fw-bold">{detailtCustomerState.updated_at}</span></p>
            </div>
        </div>
        :
        <h4>Vui lòng chọn tài khoản để xem</h4>
    );
}

class Tab2 extends Component {
    render() {
        return (
            <DataTab detailtCustomerState={this.props.detailtCustomerState} />
        );
    }
}

export default Tab2;