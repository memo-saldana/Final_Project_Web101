import Button from './Button';
import NoteTitle from './NoteTitle';
import React from 'react';

const RightPanel = (props) => (
  <div className="rightPanel">
    {props.contents.map(content => (
      <NoteTitle
        key={content.title}
        title={content.title}
      />
    ))}
    
    <Button
      className="addNoteButton"
      handler={props.showModalHandler}
      name="+"
    />
  </div>
);

export default RightPanel;
