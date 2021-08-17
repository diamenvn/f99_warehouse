import React, {
    Component
} from 'react';
import MasterLayout from '../layout/master';
import Analytics from '../../components/site/datatable/index';

class AnalyticsContainer extends Component {
    render() {
        return (
            <MasterLayout>
                <Analytics {...this.props} />
            </MasterLayout>
        );
    }
}

export default AnalyticsContainer;