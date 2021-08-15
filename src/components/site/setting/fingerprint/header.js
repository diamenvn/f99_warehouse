import React, {
    Component
} from 'react';
import { FcDocument, FcDataRecovery, FcDownload, FcViewDetails, FcEmptyTrash } from 'react-icons/fc';
import { MdKeyboardArrowRight } from 'react-icons/md';
import Breadcrumb from '../../../master/main/breadcrumb';
import { Link } from 'react-router-dom';

class Header extends Component {
    render() {
        return (
            <section className="buttonaction buttonaction--layout">
                <Breadcrumb><Link to="/setting">Cài đặt</Link> <MdKeyboardArrowRight /> Kết nối máy chấm công</Breadcrumb>
                <div className="button-action button-action--layout w-100 d-flex border-bottom">
                    <div className="action_item" onClick={(e) => this.props.clickAdd(e)}>
                        <FcDataRecovery /> <span>Thêm máy chấm công</span>
                    </div>
                    <div className="action_item disabled">
                        <FcDocument /> <span>Xem và sửa</span>
                    </div>
                    <div className="action_item border-right disabled">
                        <FcEmptyTrash /> <span>Xoá</span>
                    </div>
                    <div className="action_item disabled">
                        <FcViewDetails /> <span>In dữ liệu</span>
                    </div>
                    <div className="action_item disabled">
                        <FcDownload /> <span>Lấy dữ liệu từ máy chấm công</span>
                    </div>
                </div>
            </section>
        );
    }
}


export default Header;