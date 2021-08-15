import React, {
    Component
} from 'react';
import Header from './header';
import Main from './main';
import '../style.sass';



class ConnectFingerprint extends Component {
    state = {
        clickAdd: false
    }
    clickAdd = e => {
        this.setState({ clickAdd: true });
    }
    toogleClickAdd = e => {
        this.setState({ clickAdd: false });
    }
    render() {
        return (
            <div className="d-flex flex-column h-100">
                <Header clickAdd={this.clickAdd} />
                <Main clickAdd={this.state.clickAdd} toogleClickAdd={this.toogleClickAdd} />
            </div>
        );
    }
}

export default ConnectFingerprint;