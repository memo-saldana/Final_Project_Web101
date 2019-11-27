import Button from './Button';
import PropTypes from 'prop-types';
import React from 'react';
import { Link, withRouter } from 'react-router-dom';

class LoginPage extends React.Component {
  constructor() {
    super();

    this.state = {
      email: "",
      password: ""
    }

    this._handleChamge = this._handleChamge.bind(this);
    this._login = this._login.bind(this);
  }

  static propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  };

  _handleChamge(e) {
    const {name , value} = e.target;
    this.setState({ [name]: value });
  }

  _login() {
    console.log("Do login stuff here");

    this.props.history.push('/');
  }

  render() {
    return(
      <div className="loginContainer">
        <input name="email" onChange={this._handleChamge} placeholder="Email" type="email" />
        <input name="password" onChange={this._handleChamge} placeholder="Password" type="password"/>
        <Button className="saveCancel" handler={this._login} id="save" name="Login"/>
        <Link to="/signup">
          <p className="logout">Don't have an account? Sign up!</p>
        </Link>
      </div>
    );
  }
}

export default withRouter(LoginPage);
