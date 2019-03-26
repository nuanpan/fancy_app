import React, { Component } from 'react'
import styles from '../../css/formLogin.css';


class Alert extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {classN, message} = this.props;
        return (
            <div className={classN}>
                <span className={styles.closebtn} >
                    {message}
                </span>
            </div >
        )
    }

}

export default Alert;