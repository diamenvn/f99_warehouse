import React, {
    Component
} from 'react';

import { Input, Button, Form, Spin, Alert } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import Master from './master';
import './style.sass';
import Logo from '../../storages/image/logo2.png';
import { UserAPI } from '../../api/auth/userApi';
import Cookies from 'js-cookie'

class Login extends Component {
    state = {
        username: "",
        password: "",
        errLogin: false,
        errMsg: "",
        loading: false
    }
    render() {
        return (
            <Master>
                <div className="login_form login_form--layout">
                    <Spin spinning={this.state.loading}>
                        <Form
                            className="text-center"
                            name="basic"
                            initialValues={{ remember: true }}
                            onFinish={this.login}
                            onFinishFailed={this.login}
                        >
                            <img alt="logo" className="logo" src={Logo} />
                            <div className="text mb-30">
                                <h1 className="fw-bold">Đăng nhập F99 Warehouse</h1>
                            </div>
                            <Alert className={this.state.errLogin ? "d-block" : "d-none"} message={this.state.errMsg} type="error" />
                            <div className="form-control my-10">
                                <div className="text-left fs-13 mb-5 co-gray">Nhập tài khoản</div>
                                <Form.Item
                                    name="username"
                                    className="text-left"
                                    rules={[{ required: true, message: 'Vui lòng nhập tên tài khoản' }]}
                                ><Input onChange={(e) => this.changeInputUser(e)} prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Nhập tài khoản" /></Form.Item>

                            </div>
                            <div className="form-control my-10">
                                <div className="text-left fs-13 mb-5 co-gray">Nhập mật khẩu</div>
                                <Form.Item
                                    name="password"
                                    className="text-left"
                                    rules={[{ required: true, message: 'Vui lòng nhập mật khẩu' }]}
                                ><Input.Password onChange={(e) => this.changeInputPass(e)} prefix={<LockOutlined className="site-form-item-icon" />} placeholder="Nhập mật khẩu" /></Form.Item>
                            </div>
                            <div className="form-control my-20">
                                <Button htmlType="submit" type="primary" size="large" className="btn_login--layout fs-16">Đăng nhập</Button>
                            </div>
                            <div className="form-control mb-15">
                                <span><a href="/">Quên mật khẩu?</a></span>
                            </div>
                        </Form>
                    </Spin>
                </div>
            </Master>
        );
    }

    login = () => {
        const { username, password } = this.state;
        if (!!!username || !!!password) return;
        

        let data = {
            username: username,
            password: password
        };

        this.setState({ loading: true });
        UserAPI.login(data).then(res => {
            const { data } = res;
            if (data.success) {
                Cookies.set('_session', data.data);
                window.location.href = "/timekeeping";
            } else {
                this.setState({
                    errLogin: true,
                    errMsg: data.msg
                });
            }
        }).catch(res => {
            this.setState({
                errLogin: true,
                errMsg: res.message
            });
        }).finally(res => {
            this.setState({ loading: false });
        });
    }

    changeInputUser = (val) => {
        this.setState({
            username: val.target.value,
            errLogin: false
        });
    }
    changeInputPass = (val) => {
        this.setState({
            password: val.target.value,
            errLogin: false
        });
    }
}

function dispatchData(dispatchData) {
}

export default Login;