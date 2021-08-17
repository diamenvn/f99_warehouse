import React, {
    Component
} from 'react';
import { GiFamilyTree } from 'react-icons/gi';

class Breadcrumb extends Component {
    render() {
        return (
            <div className="action--layout co-black d-flex flex-between">
                <h3 className="m-0 fw-bold fs-18 title_category title_category--layout d-flex align-items-center">{this.props.children}</h3>
                <div className="title_company d-flex align-items-center fw-500">
                    <GiFamilyTree /> <span>Công ty Cổ phần Đầu tư Công nghệ F99</span>
                </div>
            </div>
        );
    }
}


export default Breadcrumb;