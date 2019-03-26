import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import store from 'store';
import LeftMenu from './LeftMenu';
import RightBody from './RightBody';
import FormLogin from './FormLogin';
import CreateUser from './CreateUser';
import LanguageSetting from './LanguageSetting';
import Security from './SecuritySetting';
import Logout from './Logout';

import {
    BrowserRouter as Router,
    Route,
    Link,
    Redirect,
    Switch,
    withRouter
} from "react-router-dom";
import SecuritySetting from './SecuritySetting';


class Page extends React.Component {
    constructor(props) {
        super(props);
        this.isLoggedIn = localStorage.getItem('isLoggedIn');
        this.routes = [
            {
                path: "/",
                exact: true,
                main: () => <LanguageSetting />
            },
            {
                path: "/language",
                exact: true,
                main: () => <LanguageSetting />
            },
            {
                path: "/security",
                main: () => <SecuritySetting />
            },
            {
                path: "/logout",
                sidebar: () => <div>shoelaces!</div>,
                main: () => <Logout />
            },
            {
                path: "/login",
                sidebar: () => <div>shoelaces!</div>,
                main: () => <FormLogin />
            }
        ];
    }
    render() {
        return (
            <>
            {this.isLoggedIn ? (
                <Router>
                    <div>
                        <LeftMenu routes={this.routes} />
                        <RightBody routes={this.routes} />
                    </div>
                </Router>
            ) : (<Redirect to="/login" />)}
            </>
        );
    }

}

export default Page;