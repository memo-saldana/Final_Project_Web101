import React from 'react';

const NoteTitle = (props) => ( 
  <div
    className="noteTitle"
    name={props.title}
    onClick={props.handleOpenModal}
  > 
    {props.title} 
  </div> 
);

export default NoteTitle;