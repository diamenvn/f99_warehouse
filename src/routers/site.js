import React, { Component } from 'react';
import { Route, BrowserRouter as Router } from "react-router-dom";
  
import DashboardContainer from '../containers/dashboard/homeDashboardContainer'

//Department
import DepartmentListContainer from '../containers/department/departmentListContainer'
//User
import ListUserContainer from '../containers/user/listUserContainer'

//Setting
import FingerprintContainer from '../containers/setting/fingerprintContainer'
//Auth
import LoginContainer from '../containers/auth/loginContainer';
class Routing extends Component {
    render() {
        return (
            <Router>
                <Route exact path="/timekeeping" component={DashboardContainer} />
                <Route exact path="/department/list" component={DepartmentListContainer} />
                <Route exact path="/" component={LoginContainer} />

                {/* USER */}
                <Route exact path="/user/list" component={ListUserContainer} />

                {/* SETTING */}
                <Route exact path="/setting/connect_to_fingerprint" component={FingerprintContainer} />
            </Router>
        );
    }
}
  
export default Routing;
  