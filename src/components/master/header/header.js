import React, {
    Component
} from 'react';
import './header.sass';
import { AiOutlineSearch, AiOutlineUnorderedList, AiOutlineExport } from 'react-icons/ai';
import { TiArrowRightOutline } from 'react-icons/ti';
import { MdNotifications, MdAccessTime } from 'react-icons/md';
import { Badge, Popover } from 'antd';
import Logo from '../../../storages/image/logo2.png';
import Cookies from 'js-cookie'
import { NavLink } from 'react-router-dom';
import { FiHome, FiUsers, FiFileText, FiSettings } from 'react-icons/fi';
import { FaRegFileExcel } from 'react-icons/fa';

let token = Cookies.get('_session') ? JSON.parse(Cookies.get('_session')) : "";

const content = (
    <div>
        <p>Không có thông báo nào</p>
    </div>
);

const account = (
    <div>
        <p><NavLink to="/logout">Đăng xuất</NavLink></p>
    </div>
);


class Header extends Component {
    render() {
        return (
            <header className="header">
                <div className="header__pd-safe header--layout">
                    <div className="container">
                        <div className="row">
                            <div className="col-8">
                                <div className="d-flex">
                                    <div className="logo logo--layout d-flex align-items-center header__item co-white fs-30 fw-bold">
                                        <img alt="logo" src={Logo} />
                                        <span className="fs-16">KHO DỮ LIỆU SỐ ZHOLDING</span>
                                    </div>
                                    <div className="icon__open_list co-white flex-center header__item fs-20">
                                        <AiOutlineUnorderedList className="icon--hover" />
                                    </div>
                                    <div className="search search--layout header__item p-relative">
                                        <input name="" className="fs-20 h-100" placeholder="Tìm kiếm số điện thoại hoặc tên" />
                                        <div className="p-absolute icon-search">
                                            <AiOutlineSearch />
                                        </div>
                                        <div className="p-absolute icon-entry">
                                            <TiArrowRightOutline className="icon--hover" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-4">
                                <div className="d-flex justify-content-end h-100">
                                    <div className="icon__notify icon__notify--layout flex-center co-default px-10">
                                        <Popover content={content} title="Thông báo">
                                            <Badge count={0} showZero>
                                                <MdNotifications className="fs-25 icon--hover co-white" />
                                            </Badge>
                                        </Popover>
                                    </div>
                                    <div className="header__profile header__profile--layout flex-center">
                                        <div className="profile--layout">
                                            <div className="profile_avatar flex-center">
                                                <span className="fs-20 co-black fw-bold">N</span>
                                            </div>
                                        </div>
                                        <div className="profile--layout">
                                            <Popover content={account} title="Tài khoản">
                                                <div className="profile_name flex-center co-white fw-bold hover--bg">
                                                    {token.name}
                                                </div>
                                            </Popover>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="header__menu">
                    <ul className="header__menu__lists m-0 py-10 px-5">
                        <NavLink to="/dashboard" activeClassName="active" className="d-inline-block text-center item">
                            <span className="d-flex align-items-center justify-content-center"><FiHome /> Dashboard</span>
                        </NavLink>
                        <NavLink to="/analytics" activeClassName="active" className="d-inline-block text-center item">
                            <span className="d-flex align-items-center justify-content-center"><AiOutlineExport /> Phân tích</span>
                        </NavLink>
                        <NavLink to="/import/excel" activeClassName="active" className="d-inline-block text-center item">
                            <span className="d-flex align-items-center justify-content-center"><FaRegFileExcel /> Thêm dữ liệu</span>
                        </NavLink>
                        {/* <NavLink to="/account" activeClassName="active" className="d-inline-block text-center item">
                            <span className="d-flex align-items-center justify-content-center"><FiUsers /> Quản trị tài khoản</span>
                        </NavLink> */}
                        <NavLink to="/setting" activeClassName="active" className="d-inline-block text-center item">
                            <span className="d-flex align-items-center justify-content-center"><FiSettings /> Thiết lập</span>
                        </NavLink>
                        
                    </ul>
                </div>
            </header>
        );
    }
}

export default Header;