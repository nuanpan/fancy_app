import React, { Component } from 'react'
import styles from '../../css/leftMenu.css'
import { Link } from "react-router-dom";
import RightBody from './RightBody';
import FormLogin from './FormLogin';


class LeftMenu extends React.Component {
  constructor(props) {
    super(props);
    this.routes = props.routes;
    this.props = props;
  }

  render() {
    return (
      <div
        className={styles.sidenav}
      >
        <ul style={{ listStyleType: "none", padding: 6  }}>
          <li>
            <Link to="/language">General</Link>
          </li>
          <li>
            <Link to="/security">Security</Link>
          </li>
          <li>
            <Link to="/logout" {...this.props}>Logout</Link>
          </li>
        </ul>
      </div>
    );
  }
}

export default LeftMenu;