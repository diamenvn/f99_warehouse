import React, {
    Component
} from 'react';
import MasterLayout from '../layout/master';
import ConnectFingerprint from '../../components/site/setting/fingerprint/index';

class FingerprintContainer extends Component {
    render() {
        return (
            <MasterLayout>
                <ConnectFingerprint />
            </MasterLayout>
        );
    }
}

export default FingerprintContainer;