import './App.css';
import Login from './LoginPage';
import MainApp from './MainApp';
import PrivateRoute from './PrivateRoute';
import React from 'react';
import Signup from './SignupPage';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'


class App extends React.Component {
  constructor() {
    super();
    this.state = { isLoggedin: true };
  }

  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route path="/login" component={Login}/>
            <Route path="/signup" component={Signup}/>
            <PrivateRoute path="/" component={MainApp} isAuth={this.state.isLoggedin}/>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
