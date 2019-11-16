import React from 'react';
import './App.css';

class CategoryButton extends React.Component {
  render() {
    return (
      <span 
        className={this.props.className} 
        id={this.props.id}
        onClick={this.props.handler}
        name={this.props.name}
      >
        {this.props.name}
      </span>
    );
  }
}

export default CategoryButton;
