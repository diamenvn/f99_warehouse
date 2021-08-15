import React, {
    Component
} from 'react';
import MasterLayout from '../layout/master';
import DepartmentList from '../../components/site/department/list/index';

class DepartmentListContainer extends Component {
    render() {
        return (
            <MasterLayout>
                <DepartmentList />
            </MasterLayout>
        );
    }
}

export default DepartmentListContainer;