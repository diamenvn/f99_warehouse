import React, {
    Component
} from 'react';

import Header from '../../components/master/header/header';
import SideBar from '../../components/master/sidebar/sidebar';
import '../../components/style/master.sass';
import 'antd/dist/antd.css';

class MasterLayout extends Component {
    render() {
        return(
            <div className="wrapper">
                <Header />
                <div className="main main--layout d-flex flex-1">
                    <SideBar />
                    <article className="main_content main_content--layout flex flex-1 overflow-hidden sizing">
                        {this.props.children}
                    </article>
                </div>
            </div>
        );
    }
}

export default MasterLayout;