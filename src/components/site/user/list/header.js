import React, {
    Component
} from 'react';
import { FcDocument, FcDataRecovery, FcDownload, FcViewDetails, FcEmptyTrash } from 'react-icons/fc';
import Breadcrumb from '../../../master/main/breadcrumb';
import { MdKeyboardArrowRight } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { Popconfirm } from 'antd';

class Header extends Component {
    render() {
        return (
            <section className="buttonaction buttonaction--layout">
                <Breadcrumb><Link to="/setting">Hồ sơ</Link> <MdKeyboardArrowRight /> Danh sách nhân viên</Breadcrumb>
                <div className="button-action button-action--layout w-100 d-flex border-bottom">
                    <div className="action_item" onClick={(e) => this.props.clickAdd(e)}>
                        <FcDataRecovery /> <span>Thêm nhân viên</span>
                    </div>
                    <div className={"action_item " + (this.props.enableButtonClickEdit ? "active" : "disabled")} onClick={(e) => this.props.enableButtonClickEdit && this.props.clickEdit(e)}>
                        <FcDocument /> <span>Xem và sửa</span>
                    </div>
                    <Popconfirm
                        title="Bạn có chắc chắn muốn xoá nhân viên này"
                        onConfirm={(e) => this.props.onDelete(true)}
                        okText="Đồng ý"
                        cancelText="Huỷ bỏ"
                    >
                        <div className={"action_item border-right " + (this.props.enableButtonClickEdit ? "active" : "disabled")}>

                            <span><FcEmptyTrash />Xoá nhân viên</span>
                        </div>
                    
                    </Popconfirm>
                <div className="action_item disabled">
                    <FcViewDetails /> <span>In dữ liệu</span>
                </div>
                <div className="action_item disabled">
                    <FcDownload /> <span>Lấy dữ liệu từ máy chấm công</span>
                </div>
                </div>
            </section >
        );
    }
}


export default Header;