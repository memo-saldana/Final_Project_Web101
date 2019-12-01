import React from 'react'
import { Redirect, Route } from 'react-router-dom'

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={ props => (
    rest.isAuth
      ? <Component {...props} logoutHandler={rest.logoutHandler}/>
      : <Redirect to='/login' />
  )}/>
);

export default PrivateRoute;
