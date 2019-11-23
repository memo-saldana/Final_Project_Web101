import Button from './Button';
import React from 'react';

class SignupPage extends React.Component {
  constructor() {
    super();

    this.state = {
      email: "",
      password: "",
      passwordConfirmation: ""
    }

    this._handleChamge = this._handleChamge.bind(this);
    this._signUp = this._signUp.bind(this);
  }

  _handleChamge(e) {
    const {name , value} = e.target;
    this.setState({ [name]: value });
  }

  _signUp() {
    console.log("Do login stuff here");
  }

  render() {
    return(
      <div className="loginContainer">
        <input name="email" onChange={this._handleChamge} placeholder="Email" type="email" />
        <input name="password" onChange={this._handleChamge} placeholder="Password" type="password"/>
        <input name="passwordConfirmation" onChange={this._handleChamge} placeholder="Confirm password" type="password"/>
        <Button className="saveCancel" handler={this._signUp} id="save" name="Signup"/>
      </div>
    );
  }
}

export default SignupPage;
