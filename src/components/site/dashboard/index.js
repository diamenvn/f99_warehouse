import React, {
    Component
} from 'react';
import Header from './header';
import Main from './main';
import './style.sass';

class Dashboard extends Component {

    render() {
        return(
            <div className="d-flex flex-column h-100">
                <Header />
                <Main />
            </div>
        );
    }
}

export default Dashboard;