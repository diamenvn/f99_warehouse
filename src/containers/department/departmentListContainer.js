import React, {
    Component
} from 'react';
import MasterLayout from '../layout/master';
import Dashboard from '../../components/site/dashboard/list/index';

class DepartmentListContainer extends Component {
    render() {
        return (
            <MasterLayout>
                <Dashboard />
            </MasterLayout>
        );
    }
}

export default DepartmentListContainer;