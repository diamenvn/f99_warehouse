import React, {
    Component
} from 'react';
import { FcDocument, FcDataRecovery, FcDownload, FcViewDetails, FcEmptyTrash } from 'react-icons/fc';
import Breadcrumb from '../../master/main/breadcrumb';

class Header extends Component {
    render() {
        return(
            <section className="buttonaction buttonaction--layout">
                <Breadcrumb>Chấm công</Breadcrumb>
                <div className="button-action button-action--layout w-100 d-flex">
                    <div className="action_item">
                        <FcDataRecovery /> <span>Thêm</span>
                    </div>
                    <div className="action_item">
                        <FcDocument /> <span>Xem và sửa</span>
                    </div>
                    <div className="action_item border-right">
                        <FcEmptyTrash /> <span>Xoá</span>
                    </div>
                    <div className="action_item">
                        <FcViewDetails /> <span>In dữ liệu</span>
                    </div>
                    <div className="action_item">
                        <FcDownload /> <span>Lấy dữ liệu từ máy chấm công</span>
                    </div>
                </div>
            </section>
        );
    }
}


export default Header;