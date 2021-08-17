import React, {
    Component
} from 'react';
// import { Spin } from 'antd';

class Main extends Component {
    state = {
        loading: false
    }

    iframe = () => {
        return {
          __html: this.props.iframe
        }
    }

    render() {
        return (
            <section className="main-dashboard main-dashboard--layout flex-1">
                <div className="d-flex w-100 h-100 align-items-center justify-content-center">
                    <iframe src="https://datalake.warehouse-stg.info" style={{border:'none'}} height="100%" width="100%"/>         
                </div>
            </section>
        );
    }
}


export default Main;