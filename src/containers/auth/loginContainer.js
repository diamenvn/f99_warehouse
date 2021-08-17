import React, {
    Component
} from 'react';

import Login from '../../components/auth/login';


function LoginContainer(props) {
    if (props.token) {
        window.location.href = "/";
    }else{
        return (
            <Login />
        );
    }
}

export default LoginContainer;