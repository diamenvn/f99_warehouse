import React, {
    Component
} from 'react';
import MasterLayout from '../layout/master';
import ImportComponent from '../../components/site/import/index';

class ImportContainer extends Component {
    render() {
        return (
            <MasterLayout>
                <ImportComponent />
            </MasterLayout>
        );
    }
}

export default ImportContainer;