import React from 'react'
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
import CreateUser from './CreateUser';
import Page from './Page';
import { WSAEPROVIDERFAILEDINIT } from 'constants';
import LanguageSetting from './LanguageSetting';
import Alert from './Alert';
import * as config from '../constants/config';

class FormLogin extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = { userName: '', password: '', isLoggedIn: this.props.isLoggedIn, redirect: false, message: '' }
        this.handleOnSubmit = this.handleOnSubmit.bind(this);
    }

    render() {
        const { redirect } = this.state;
        if (redirect) {
            return <Redirect to='/' />;
        }
        return (
            <>
            <div className={styles.formlogin}>
                <form onSubmit={this.handleOnSubmit}>
                    <h1>Fancy App</h1>
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
                    />
                    <Alert className={[this.state.classN, this.state.displayMessage].join(' ')}
                        message={this.state.message} /> <br />
                    <input type="submit" value="Login" />
                    <Link to="/createuser" className={styles.buttonLogin}>Create New Account</Link><br />

                </form >
            </div>
            </>
        );
    }

    handleOnSubmit(event) {
        event.preventDefault();
        let url = `${config.prefixUrl}${config.path.user.login}`
        let data = {
            email: this.state.userName,
            password: this.state.password
        };

        axios.post(url, {
            email: this.state.userName,
            password: this.state.password
        }).then(res => {
            if (res.data.code === 200 && !res.data.err_message) {
                localStorage.setItem('isLoggedIn', true)
                localStorage.setItem('token', res.data.data.token)
                localStorage.setItem('user', JSON.stringify(res.data.data.users))
                this.setState({ redirect: true })
            } else {
                this.setState({ message: res.data.err_message })
            }
        })

    }
}


export default FormLogin;