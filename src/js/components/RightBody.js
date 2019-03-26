import React from 'react'
import styles from '../../css/rightBody.css';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  Switch,
  withRouter
} from "react-router-dom";
import FormLogin from './FormLogin';
import Logout from './Logout';


class RightBody extends React.Component {
  constructor(props) {
    super(props)
    this.routes = props.routes;
  }
  render() {
    return (
      <div className={styles.main}>
        {this.routes.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            exact={route.exact}
            component={route.main}
          />
        ))}
      </div>
    )
  }
}

export default RightBody;