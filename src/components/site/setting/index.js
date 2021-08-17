import React, {
    Component
} from 'react';

import Main from './main';

class SettingComponent extends Component {
    render() {
        return (
            <div className="d-flex flex-column h-100">
                <Main />
            </div>
        );
    }
}

export default SettingComponent;