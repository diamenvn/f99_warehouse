import React, {
    Component
} from 'react';
import MasterLayout from '../layout/master';
import ListUser from '../../components/site/user/list/index';

class ListUserContainer extends Component {
    render() {
        return (
            <MasterLayout>
                <ListUser />
            </MasterLayout>
        );
    }
}

export default ListUserContainer;