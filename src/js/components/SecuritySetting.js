import React, { Component } from 'react'
import axios from 'axios';
import {
    BrowserRouter as Router,
    Route,
    Link,
    Redirect,
    Switch,
    withRouter
} from "react-router-dom";
import styles from '../../css/formLogin.css';
import * as config from '../constants/config';
import Alert from './Alert';


class SecuritySetting extends React.Component {
    constructor(props) {
        super(props);
        this.isLoggedIn = localStorage.getItem('isLoggedIn');
        this.user = localStorage.getItem('user');
        this.state = { redirect: false , oldPassword: '', newPassword: '', confirmPassword: '', displayMessage: '', classN: ''}
        this.handleDelete = this.handleDelete.bind(this);
        this.handleOnSubmit = this.handleOnSubmit.bind(this);
    }

    render() {
        const { redirect } = this.state;
        if (this.isLoggedIn) {
            if (redirect) {
                return <Redirect to="/" />
            }
            return (
                <>
                <div className={styles.formlogin}>
                    <form onSubmit={this.handleOnSubmit}>
                        <label>Old Password:</label>
                        <input type="password"
                            name="oldPassword"
                            value={this.state.oldPassword}
                            onChange={event => this.setState({ oldPassword: event.target.value })}
                            required />
                        <label>New Password:</label>
                        <input type="password"
                            name="newPassword"
                            value={this.state.newPassword}
                            onChange={event => this.setState({ newPassword: event.target.value })}
                            required />
                        <input type="password"
                            name="confirmPassword"
                            value={this.state.confirmPassword}
                            onChange={event => this.setState({ confirmPassword: event.target.value })}
                            required />
                            <Alert className={[this.state.classN, this.state.displayMessage].join(' ')}
                        message={this.state.message} /> <br />
                        <input type="submit" value="Save Changes" />
                    </form >
                </div>
                <div className={styles.formlogin}>
                    <div>Once the deletion process begins, you won’t be able to access your account or retrieve	any of the settings you have changed.</div>
                    <input type="button" value="Delete Account" className={styles.buttonLogin} onClick={this.handleDelete} />
                </div>
                </>
            );
        }

        return <Redirect to="/login" />

    }

    handleDelete() {
        let user = JSON.parse(localStorage.getItem('user'));
        let token = localStorage.getItem('token');
        let url = `${config.prefixUrl}${config.path.user.deleteUser}${user.id}`
        const httpReqHeaders = {
            'Authorization': "Bearer " + token,
            'Content-Type': 'application/json'
        };

        const axiosConfigObject = { headers: httpReqHeaders };

        axios.delete(url, axiosConfigObject).then(res => {
            if (res.data.code === 200) {
                localStorage.removeItem('isLoggedIn')
                localStorage.removeItem('token')
                this.setState({ redirect: true })
            }
        })
    }

    handleOnSubmit(event) {
        event.preventDefault();
        let user = JSON.parse(localStorage.getItem('user'));
        let url = `${config.prefixUrl}${config.path.user.changePassword}${user.id}`
        if (this.checkPassword()) {
            axios.put(url, {
                oldPassword: this.state.oldPassword,
                newPassword: this.state.newPassword
            }).then(res => {
                if (res.data.err_message)
                    this.setState({ message: res.data.err_message })
                else
                    this.setState({ message: res.data.message });
            })
        } else {
            this.setState({ message: "Password not match" })
        }
    }

    checkPassword() {
        if (this.state.newPassword != this.state.confirmPassword) {
            return false;
        } else {
            return true;
        }
    }

}

export default SecuritySetting;