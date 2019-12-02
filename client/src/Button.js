import React from 'react';

const Button = (props) => (
  <span 
    className={props.className}
    id={props.id}
    name={props.name}
    onClick={props.handler}
    value={props._id}
  >
    {props.name}
  </span>
);

export default Button;
