import React from 'react';
import './App.css';

class NoteTitle extends React.Component {
  render() {

    return (
      <div className="noteTitle">
        {this.props.title}
      </div>
    );
  }
}

export default NoteTitle;