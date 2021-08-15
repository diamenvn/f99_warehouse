import React, {
    Component, useState
} from 'react';
import NoAvatar from '../../../../../storages/image/no_avatar.png';
import NumberFormat from 'react-number-format';

const DataTab1 : React.FC<CollectionCreateFromProps> = ({
    detailtCustomerState
}) => {
    const [expand, setExpand] = useState(false);
    let avatar = detailtCustomerState.customer_info != null ? detailtCustomerState.customer_info.picture_url != null ? detailtCustomerState.customer_info.picture_url : NoAvatar : NoAvatar;
    let dateStartWorking = detailtCustomerState.customer_info != null ? detailtCustomerState.customer_info.date_start_working : "";
    let level = detailtCustomerState.customer_info != null ? detailtCustomerState.customer_info.level : "";
    let department = detailtCustomerState.department_connect != null ? detailtCustomerState.department_connect.department.department_name : "";
    let salary = detailtCustomerState.customer_info != null ? detailtCustomerState.customer_info.salary : 0;
    let salarySafe = detailtCustomerState.customer_info != null ? detailtCustomerState.customer_info.salary_safe : 0;
    let salaryHold = detailtCustomerState.customer_info != null ? detailtCustomerState.customer_info.salary_hold : 0;
    let salaryHoldTime = detailtCustomerState.customer_info != null ? detailtCustomerState.customer_info.time_salary_hold : 0;
    return (
        <div className="d-flex p-5">
            <div className="picture">
                <img src={avatar} alt="picture" />
            </div>
            <div className="profile-general d-flex w-100">
                <div className="col-6">
                    <p className="d-flex"><span className="d-block col-4">Họ và tên:</span> <span className="fw-bold">{detailtCustomerState.name}</span></p>
                    <p className="d-flex"><span className="d-block col-4">Ngày sinh:</span> <span className="fw-bold">{detailtCustomerState.dateofbirth}</span></p>
                    <p className="d-flex"><span className="d-block col-4">Ngày bắt đầu làm:</span> <span className="fw-bold">{dateStartWorking}</span></p>
                    <p className="d-flex"><span className="d-block col-4">Vị trí công việc:</span> <span className="fw-bold">{department}</span></p>
                    <p className="d-flex"><span className="d-block col-4">Chức vụ công việc:</span> <span className="fw-bold">{level}</span></p>
                </div>
                <div className="col-6">
                    <p className="d-flex"><span className="d-block col-4">Lương cơ bản:</span> <span className="fw-bold"><NumberFormat value={salary} displayType={'text'} thousandSeparator={true} /> VNĐ</span></p>
                    <p className="d-flex"><span className="d-block col-4">Tỷ lệ hưởng lương:</span> <span className="fw-bold">100%</span></p>
                    <p className="d-flex"><span className="d-block col-4">Lương đóng bảo hiểm</span> <span className="fw-bold"><NumberFormat value={salarySafe} displayType={'text'} thousandSeparator={true} /> VNĐ</span></p>
                    <p className="d-flex"><span className="d-block col-4">Lương giữ cọc / 1 tháng</span> <span className="fw-bold"><NumberFormat value={salaryHold} displayType={'text'} thousandSeparator={true} /> VNĐ</span></p>
                    <p className="d-flex"><span className="d-block col-4">Thời hạn giữ cọc</span> <span className="fw-bold">{salaryHoldTime} tháng</span></p>
                </div>
            </div>
        </div>
    );
}

class Tab1 extends Component {
    render() {
        return (
            <DataTab1 detailtCustomerState={this.props.detailtCustomerState} />
        );
    }
}

export default Tab1;