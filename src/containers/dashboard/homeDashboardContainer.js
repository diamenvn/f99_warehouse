import React, {
    Component
} from 'react';
import MasterLayout from '../layout/master';
import Dashboard from '../../components/site/dashboard/index';
class HomeDashboardContainer extends Component {
    render() {
        return (
            <MasterLayout>
                <Dashboard />
            </MasterLayout>
        );
    }
}

export default HomeDashboardContainer;