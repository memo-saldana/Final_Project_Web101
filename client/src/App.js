import './App.css';
import Login from './LoginPage';
import MainApp from './MainApp';
import PrivateRoute from './PrivateRoute';
import React from 'react';
import Signup from './SignupPage';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import axios from 'axios';

const URI = 'https://webdevclass-finalproject.herokuapp.com';
// const URI = 'localhost:8080';
class App extends React.Component {
  constructor() {
    super();
    this.state = { isLoggedin: false };
    this._login = this._login.bind(this);
    this._logout = this._logout.bind(this);
  }
  
  _login(email, password) {
    return axios.post(URI+'/api/login', {email, password})
      .then( response => {
        this.setState({isLoggedin: true})
        localStorage.setItem('token', response.data.token)
        localStorage.setItem('userId', response.data.user._id)
        return null;
      })
      .catch( error => {
        if(error.response) {
          return error.response.data.message
        }
        else return error.message
      })
  }

  _register(email, password, confirmPassword) {
    return axios.post(URI + '/api/signup', {email, password, confirmPassword})
      .then( response => {
        return null;
      })
      .catch(error => {
        if(error.response) {
          return error.response.data.message
        }
        else return error.message
      })
  }

  _logout() {
    this.setState({ isLoggedin: false });
  }

  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route 
              path="/login"
              render={(props) => (<Login {...props} loginHandler={this._login}/>)}  
            />
            <Route 
              path="/signup" 
              render={props => (<Signup {...props} signUpHandler={this._register}/>)}
            />
            <PrivateRoute
              component={MainApp}
              isAuth={this.state.isLoggedin}
              path="/"
              logoutHandler={this._logout}
            />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
