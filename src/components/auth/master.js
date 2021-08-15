
import React, {
    Component
} from 'react';
import './style.sass';
import '../style/master.sass';
import BG from '../../storages/image/background.jpg';

class Master extends Component {
    render() {
        return(
            <div className="wrapper">
                <div className="main main--layout d-flex flex-1">
                    <article style={{background: `url(${BG})`}} className="main_login main_login--layout w-100 sizing d-flex align-items-center justify-content-center">
                        {this.props.children}
                    </article>
                </div>
            </div>
        );
    }
}

export default Master;