import React from 'react'
import { Redirect, Route } from 'react-router-dom'

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={ _ => (
    rest.isAuth === true
      ? <Component />
      : <Redirect to='/login' />
  )}/>
);


export default PrivateRoute;
