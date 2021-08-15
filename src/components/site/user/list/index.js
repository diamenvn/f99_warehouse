import React, {
    Component
} from 'react';
import Header from './header';
import Main from './main';
import '../style.sass';
import { message } from 'antd';

import { UserAPI } from '../../../../api/auth/userApi';

class ListUser extends Component {
    constructor(props) {
        super(props);
        this.child = React.createRef();
    } 

    state = {
        clickAdd: false,
        clickEdit: false,
        enableButtonClickEdit: false,
        activeCustomerId: "",
        loading: true
    }
    clickAdd = e => {
        this.setState({ clickAdd: true });
    }
    toogleClickAdd = e => {
        this.setState({ clickAdd: false });
    }

    //=======

    clickEdit = e => {
        this.setState({ clickEdit: true });
    } 
    toggleButtonEdit = e => {
        this.setState({ enableButtonClickEdit: true });
    }

    toogleClickEdit = e => {
        this.setState({ clickEdit: e });
    }

    //======

    activeCustomerId = val => {
        this.setState({ activeCustomerId: val });
    }

    setLoading = val => {
        this.setState({ loading: val });
    }

    onDelete = e => {
        let data = {
            '_id': this.state.activeCustomerId
        };

        this.setState({ loading: true });
        UserAPI.removeCustomer(data).then(res => {
            const { data } = res;
            if (data.success) {
                this.child.current.loadData();
                message.success(data.msg);
            } else {
                message.error(data.msg);
            }
        }).catch(res => {
            message.error(res.message);
        });
    }

    render() {
        return (
            <div className="d-flex flex-column h-100">
                <Header clickAdd={this.clickAdd} enableButtonClickEdit={this.state.enableButtonClickEdit} clickEdit={this.clickEdit} onDelete={this.onDelete}/>
                <Main
                    ref={this.child}
                    clickAdd={this.state.clickAdd}
                    toggleButtonEdit={this.toggleButtonEdit}
                    toogleClickAdd={this.toogleClickAdd}
                    toogleClickEdit={this.toogleClickEdit}
                    clickEdit={this.state.clickEdit}
                    enableButtonClickEdit={this.state.enableButtonClickEdit}
                    clickConfirmDelete={this.state.clickConfirmDelete}
                    activeCustomerId={this.activeCustomerId}
                    loading={this.state.loading}
                    setLoading={this.setLoading}
                />
            </div>
        );
    }
}

export default ListUser;