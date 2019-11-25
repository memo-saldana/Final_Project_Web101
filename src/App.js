import './App.css';
import Login from './LoginPage';
import MainApp from './MainApp';
import PrivateRoute from './PrivateRoute';
import React from 'react';
import Signup from './SignupPage';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'


class App extends React.Component {
  constructor() {
    super();
    this.state = { isLoggedin: false };

    this._login = this._login.bind(this);
    this._logout = this._logout.bind(this);
  }
  
  _login() {
    this.setState({ isLoggedin: true });
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
            <Route path="/signup" component={Signup}/>
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
