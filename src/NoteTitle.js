import React from 'react';

const NoteTitle = (props) => ( 
  <div className="noteTitle" name={props.title}> {props.title} </div> 
);

export default NoteTitle;