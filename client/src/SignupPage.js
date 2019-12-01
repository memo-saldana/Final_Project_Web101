import Button from './Button';
import PropTypes from 'prop-types';
import React from 'react';

class SignupPage extends React.Component {
  constructor() {
    super();

    this.state = {
      email: "",
      password: "",
      passwordConfirmation: "",
      error: ""
    }

    this._handleChange = this._handleChange.bind(this);
    this._signUp = this._signUp.bind(this);
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

  async _signUp() {
    // console.log("Do login stuff here");
    let {email, password, passwordConfirmation} = this.state;
    console.log('email, password, passwordConfirmation :', email, password, passwordConfirmation);
    let error = await this.props.signUpHandler(email, password, passwordConfirmation)
    console.log('error :', error);
    if(error) {
      this.setState({error})
    } else {
      this.props.history.push('/login')
    }
    
  }

  render() {
    return(
      <div className="loginContainer">
        <p className="error">{this.state.error}</p>
        <input name="email" onChange={this._handleChange} placeholder="Email" type="email" />
        <input name="password" onChange={this._handleChange} placeholder="Password" type="password"/>
        <input name="passwordConfirmation" onChange={this._handleChange} placeholder="Confirm password" type="password"/>
        <Button className="saveCancel" handler={this._signUp} id="save" name="Signup"/>
      </div>
    );
  }
}

export default SignupPage;
