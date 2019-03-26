import React, { Component } from 'react'
import styles from '../../css/formLogin.css';
import axios from 'axios';
import { Redirect } from "react-router-dom";
import Alert from '../components/Alert';
import * as config from '../constants/config';

class LanguageSetting extends React.Component {
    constructor(props) {
        super(props);
        this.isLoggedIn = localStorage.getItem('isLoggedIn');
        const user = JSON.parse(localStorage.getItem('user'));
        this.state = {
            language: user.config.language || '',
            privacy: user.config.privacy || '',
            message: '',
            displayMessage: 'hide',
            classN: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleChangePrivacy = this.handleChangePrivacy.bind(this);
        this.handleOnSubmit = this.handleOnSubmit.bind(this);
    }

    render() {
        return (
            (this.isLoggedIn) ?
                <>
                <div className={styles.formlogin}>
                    <form onSubmit={this.handleOnSubmit}>
                        <label>Language:</label>
                        <select className={styles.blueText}
                            value={this.state.language}
                            onChange={this.handleChange}>
                            <option value="en">English</option>
                            <option value="fr">French</option>
                            <option value="gr">German</option>
                            <option value="jp">Japanese</option>
                            <option value="cn">Chinese</option>
                            <option value="kr">Korean</option>
                            <option value="th">Thai</option>
                        </select>
                        <label>Privacy:</label>
                        <label className={styles.container}>Public
                        <input type="radio"
                                name="privacy"
                                onChange={this.handleChangePrivacy}
                                value="public"
                                checked={this.state.privacy == "public"}
                            />
                            <span className={styles.checkmark}></span>
                        </label>
                        <label className={styles.container}>Privacy
                        <input type="radio"
                                name="privacy"
                                value="privacy"
                                onChange={this.handleChangePrivacy}
                                checked={this.state.privacy == "privacy"}
                            />
                            <span className={styles.checkmark}></span>
                        </label>
                        <Alert className={[this.state.classN, this.state.displayMessage].join(' ')}
                            message={this.state.message} />
                        <input type="submit" value="Save Changes" />
                    </form >
                </div> </> : <Redirect to="/login" />
        );
    }

    handleChange(event) {
        this.setState({ language: event.target.value });
    }

    handleOnSubmit(event) {
        event.preventDefault();
        let user = JSON.parse(localStorage.getItem('user'))
        let url = `${config.prefixUrl}${config.path.user.updateUser}${user.id}`
        let data = {
            config: {
                privacy: this.state.privacy,
                language: this.state.language
            }
        };
        let userData = user;
        userData.config = data.config;

        axios.put(url, data).then(res => {
            if (res.data.code === 200 && !res.data.err_message) {
                localStorage.setItem('user', JSON.stringify(userData))
                this.setState({ message: res.data.message, classN: "success", displayMessage: '' })

            } else {
                this.setState({ message: res.data.err_message, classN: "alert", displayMessage: '' })
            }
        })
    }

    handleChangePrivacy(event) {
        this.setState({ privacy: event.target.value });
    }
}

export default LanguageSetting;