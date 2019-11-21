import Button from './Button';
import React from 'react';

class TextEditor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      _id: this.props._id || undefined,
      title: this.props.title || "",
      notes: this.props.notes || ""
    }

    this._deleteNote = this._deleteNote.bind(this);
    this._handleChange = this._handleChange.bind(this);
    this._saveNote = this._saveNote.bind(this);
  }

  _deleteNote() {
    this.props.deleteNoteHandler(this.state._id);
  }

  _handleChange(e) {
   const {name, value} = e.target;

   this.setState({
     [name]: value
   });
  }

  _saveNote() {
    const {title, notes} = this.state
    
    title !== "" && notes !== "" ? 
      this.props.saveHandler(title, notes) :
      this.props.cancelHandler();
  }

  render() {
    const deleteButton = <Button className="saveCancel" handler={this._deleteNote} name="Delete" id="delete"/>
    return(
      <div className="textEditor">
        <input
          id="titleText"
          name="title" 
          onChange={this._handleChange}
          type="text"
          value={this.state.title || ""}
          placeholder="Title..."
        />
        <textarea
          id="noteContainer"
          name="notes"
          onChange={this._handleChange}
          placeholder="Notes..."
          value={this.state.notes || ""}
        />
        <div style={{marginRight:"143px"}}>
          {this.props.deleteButton ? deleteButton : null}
          <Button
            className="saveCancel"
            handler={this.props.cancelHandler}
            name="Cancel"
          />
          <Button
            className="saveCancel"
            handler={this._saveNote}
            id="save"
            name="Save"
          />
        </div>
      </div>
    );
  }
}

export default TextEditor;
