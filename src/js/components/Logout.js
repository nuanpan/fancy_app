import React, { Component } from 'react'
import {
    BrowserRouter as Router,
    Route,
    Link,
    Redirect,
    Switch,
    withRouter
} from "react-router-dom";


class Logout extends React.Component {
    constructor(props) {
        super(props);
        this.routes = props.routes;
        localStorage.removeItem('isLoggedIn');
        this.isLoggedIn = localStorage.getItem('isLoggedIn');
    }

    render() {
        return (
           <Redirect from="*" to="/" />
        ); 
    }
}

export default Logout;