import React, { Component } from 'react';
import { Route, BrowserRouter as Router } from "react-router-dom";

import AnalyticsContainer from '../containers/analytics/analyticsContainer'

import HomeComponent from '../components/site/home/index'

import LogoutComponent from '../components/auth/logout'


import ImportContainer from '../containers/import/importContainer'

import SettingContainer from '../containers/setting/settingContainer'
//Department
import DepartmentListContainer from '../containers/department/departmentListContainer'
//User
import ListUserContainer from '../containers/user/listUserContainer'

//Auth
import LoginContainer from '../containers/auth/loginContainer';

import Cookies from 'js-cookie'

function getToken() {
    let token = Cookies.get('_session') ? Cookies.get('_session') : false;
    if (token) {
        return JSON.parse(token).access_token;
    }
}


function Routing() {
    const token = getToken();

    if (!token) {
        return <LoginContainer />
    }

    return (
        <Router>
            <Route exact path="/dashboard" component={DepartmentListContainer} />
            <Route exact path="/analytics" component={AnalyticsContainer} />
            <Route exact path="/import/excel" component={ImportContainer} />
            <Route exact path="/setting" component={SettingContainer} />
            <Route exact path="/analytics/collection/:id" render={(props) => <AnalyticsContainer {...props} />} />
            <Route exact path="/login" render={(props) => <LoginContainer token={token} />} />

            <Route exact path="/" render={(props) => <HomeComponent token={token} />} />
            <Route exact path="/logout" render={(props) => <LogoutComponent />} />

            {/* USER */}
            <Route exact path="/user/list" component={ListUserContainer} />

            {/* SETTING */}
        </Router>
    );
}

export default Routing;
