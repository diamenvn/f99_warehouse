import React, {
    Component
} from 'react';
import MasterLayout from '../layout/master';
import SettingComponent from '../../components/site/setting/index';

class SettingContainer extends Component {
    render() {
        return (
            <MasterLayout>
                <SettingComponent />
            </MasterLayout>
        );
    }
}

export default SettingContainer;