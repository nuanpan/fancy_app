import React from 'react'
import LeftMenu from './LeftMenu';
import RightBody from './RightBody';
import FormLogin from './FormLogin';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  Switch,
  withRouter
} from "react-router-dom";
import CreateUser from './CreateUser';
import Page from './Page';
import LanguageSetting from './LanguageSetting';
import SecuritySetting from './SecuritySetting';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
  }
  render() {
    return (
      <>
      <Switch>
        <Route exact path="/" render={props => <Page {...this.props} />} />
        <Route path="/login"  render={props => <FormLogin {...this.props} />} />
        <Route
          path="/createuser"
          render={props => <CreateUser {...props} />}
        />
        <Route path="/page"  render={props => <Page {...this.props} />} />
        <Route path="/language"  render={props => <LanguageSetting {...this.props} />} />
        <Route path="/security"  render={props => <SecuritySetting {...this.props} />} />
      </Switch>
      </>
    );
  }
}

export default (App);
