import React, {
    Component
} from 'react';
import Header from './header';
import Main from './main';
import '../style.sass';

class DepartmentList extends Component {
    render() {
        return (
            <div className="d-flex flex-column h-100">
                <Header />
                <Main />
            </div>
        );
    }
}

export default DepartmentList;