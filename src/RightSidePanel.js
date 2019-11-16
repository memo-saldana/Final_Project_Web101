import React from 'react';
import './App.css';
import NoteTitle from './NoteTitle';

class RightPanel extends React.Component {
  render() {

    return (
      <div className="rightPanel">
        {this.props.contents.map(content => (
          <NoteTitle 
            key={content.title}
            title={content.title}
          />
        ))}
      </div>
    );
  }
}

export default RightPanel;
