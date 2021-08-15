import React, {
    Component
} from 'react';
// import { Spin } from 'antd';

class Main extends Component {
    state = {
        loading: false
    }

    render() {
        const empty = (
            <div>45345</div>
        );

        return (
            <section className="main-dashboard main-dashboard--layout flex-1">
                <div className="d-flex w-100 h-100 align-items-center justify-content-center">
                    {empty}
                </div>
            </section>
        );
    }
}


export default Main;