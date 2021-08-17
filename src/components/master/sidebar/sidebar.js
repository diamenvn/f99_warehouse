import React, {
    Component
} from 'react';
import './sidebar.sass';
import { NavLink } from 'react-router-dom';
import { FiHome, FiUsers, FiFileText, FiSettings } from 'react-icons/fi';
import { MdAccessTime, MdRateReview } from 'react-icons/md';
import { IoMdArrowDropright } from 'react-icons/io';
import { AiOutlineExport } from 'react-icons/ai';
import { Popover } from 'antd';

const content = (
    <div>
        <div className="border-bottom-dashed p-5">
            <NavLink to="/setting/connect_to_fingerprint"><IoMdArrowDropright /> Thiết lập kết nối máy chấm công</NavLink>
        </div>
        <div className="border-bottom-dashed fw-bold co-red p-5"><NavLink to="/logout"><IoMdArrowDropright />  Đăng xuất</NavLink></div>
    </div>
);

class SideBar extends Component {
    _handleClick(menuItem) { 
        this.setState({ active: menuItem });
    }

    render() {
        return (
            <aside className="sidebar sidebar--layout">
                <div className="sidebar__pd-safe h-100">
                    <div className="d-flex flex-column flex-between h-100">
                        <div className="sidebar__menu_top">
                            <div className="sidebar__item">
                                <NavLink to="/dashboard" activeClassName="active" className="w-100 text-center d-block item">
                                    <div><FiHome /></div>
                                    <span className="d-block py-5">Dashboard</span>
                                </NavLink>
                            </div>
                            <div className="sidebar__item">
                                <NavLink to="/analytics" activeClassName="active" className="w-100 text-center d-block item">
                                    <div><AiOutlineExport /></div>
                                    <span className="d-block py-5">Phân tích</span>
                                </NavLink>
                            </div>
                            <div className="sidebar__item">
                                <NavLink to="/timekeeping" activeClassName="active" className="w-100 text-center d-block item">
                                    <div><MdAccessTime /></div>
                                    <span className="d-block py-5">Lịch sử</span>
                                </NavLink>
                            </div>
                            <div className="sidebar__item">
                                <NavLink to="/payroll" activeClassName="active" className="w-100 text-center d-block item">
                                    <div><FiUsers /></div>
                                    <span className="d-block py-5">Tài khoản</span>
                                </NavLink>
                            </div>
                        </div>
                        <div className="sidebar__menu_bottom">
                            <div className="sidebar__item">
                                <Popover placement="topRight" trigger="hover" content={content} title="Thiết lập">
                                    <div className="w-100 text-center d-block item">
                                        <div><FiSettings /></div>
                                        <span className="d-block py-5">Thiết lập</span>
                                    </div>
                                </Popover>
                            </div>
                        </div>
                    </div>

                </div>
            </aside>
        );
    }
}

export default SideBar;