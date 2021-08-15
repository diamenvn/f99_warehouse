import React, {
    Component
} from 'react';
import './sidebar.sass';
import { Link } from 'react-router-dom';
import { FiHome, FiUsers, FiFileText, FiSettings } from 'react-icons/fi';
import { MdAccessTime, MdRateReview } from 'react-icons/md';
import { IoMdArrowDropright } from 'react-icons/io';
import { FaMoneyBill } from 'react-icons/fa';
import { Popover } from 'antd';

const content = (
    <div>
        <div className="border-bottom-dashed p-5">
            <Link to="/setting/connect_to_fingerprint"><IoMdArrowDropright /> Thiết lập kết nối máy chấm công</Link>
        </div>
        <div className="border-bottom-dashed fw-bold co-red p-5"><Link to="/logout"><IoMdArrowDropright />  Đăng xuất</Link></div>
    </div>
);

class SideBar extends Component {
    render() {
        return (
            <aside className="sidebar sidebar--layout">
                <div className="sidebar__pd-safe h-100">
                    <div className="d-flex flex-column flex-between h-100">
                        <div className="sidebar__menu_top">
                            <div className="sidebar__item">
                                <Link to="/" className="w-100 text-center d-block item">
                                    <div><FiHome /></div>
                                    <span className="d-block py-5">Trang chủ</span>
                                </Link>
                            </div>
                            <div className="sidebar__item">
                                <Link to="/user/list" className="w-100 text-center d-block item">
                                    <div><FiUsers /></div>
                                    <span className="d-block py-5">Hồ sơ</span>
                                </Link>
                            </div>
                            <div className="sidebar__item">
                                <Link to="/timekeeping" className="w-100 text-center d-block item active">
                                    <div><MdAccessTime /></div>
                                    <span className="d-block py-5">Chấm công</span>
                                </Link>
                            </div>
                            <div className="sidebar__item">
                                <Link to="/" className="w-100 text-center d-block item">
                                    <div><FaMoneyBill /></div>
                                    <span className="d-block py-5">Lương</span>
                                </Link>
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