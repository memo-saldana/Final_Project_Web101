import Button from './Button';
import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

class LoginPage extends React.Component {
  constructor() {
    super();

    this.state = {
      email: "",
      password: "",
      loading: false,
      error: ""
    }

    this._handleKeyDown = this._handleKeyDown.bind(this);
    this._handleChange = this._handleChange.bind(this);
    this._login = this._login.bind(this);
  }

  componentDidMount = () => {
    if(localStorage.getItem('token')) {
      this.props.history.push('/')
    }
  }

  static propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  };

  _handleChange(e) {
    const {name , value} = e.target;
    this.setState({ [name]: value });
  }

  async _login() {
    this.setState({error:""})
    let { email, password } = this.state;
    let error = await this.props.loginHandler(email, password)
    if(error) {
      this.setState({error})
    } else {
      this.props.history.push('/')
    }
  }
  _handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      this._login();
    }
  }
  render() {
    return(
      <div className="loginContainer">
        <p className='error'>{this.state.error}</p>
        <input onKeyDown={this._handleKeyDown} name="email" onChange={this._handleChange} placeholder="Email" type="email" />
        <input onKeyDown={this._handleKeyDown} name="password" onChange={this._handleChange} placeholder="Password" type="password"/>
        <Button className="saveCancel" handler={this._login} id="save" name="Login"/>
        <Link to="/signup">
          <p className="logout">Don't have an account? Sign up!</p>
        </Link>
      </div>
    );
  }
}

export default LoginPage;
