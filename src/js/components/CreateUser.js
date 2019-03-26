import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import { Redirect } from "react-router-dom";
import styles from '../../css/formLogin.css';
import Alert from './Alert';
import * as config from '../constants/config';


class CreateUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = { userName: '', password: '', confirmPassword: '', redirect: false, message: '' }
        this.handleOnSubmit = this.handleOnSubmit.bind(this);
        this.checkPassword = this.checkPassword.bind(this);
    }
    render() {
        const { redirect } = this.state;
        if (redirect) {
            return <Redirect to='/login' />;
        }
        return (
            <>
            <div>{this.state.err}</div>
            <div className={styles.formlogin}>
                <form onSubmit={this.handleOnSubmit}>
                    <h1>Create New Account</h1>
                    <label>Email:</label>
                    <input type="text"
                        name="username"
                        value={this.state.userName}
                        onChange={event => this.setState({ userName: event.target.value })}
                        required />
                    <label>Password:</label>
                    <input type="password"
                        name="password"
                        ref={this.state.password}
                        onChange={event => this.setState({ password: event.target.value })}
                        required />
                    <label>Confirm Password:</label>
                    <input type="password"
                        name="confirmPassword"
                        ref={this.state.confirmPassword}
                        onChange={event => this.setState({ confirmPassword: event.target.value })}
                        required />
                    <Alert className={[this.state.classN, this.state.displayMessage].join(' ')}
                        message={this.state.message} /> <br />
                    <input type="submit" value="Create New Account" />
                </form >
            </div>
            </>
        );

    }

    handleOnSubmit() {
        event.preventDefault();
        let url = `${config.prefixUrl}${config.path.user.createUser}`
        if (this.checkPassword()) {
            axios.post(url, {
                email: this.state.userName,
                password: this.state.password
            }).then(res => {
                if (res.data.err_message)
                    this.setState({ message: res.data.err_message })
                else
                    this.setState({ redirect: true });
            })
        } else {
            this.setState({ message: "Password not match" })
        }
    }

    checkPassword() {
        if (this.state.password != this.state.confirmPassword) {
            return false;
        } else {
            return true;
        }
    }

}

export default CreateUser;