import Button from './Button';
import React from 'react';
import ReactMde from 'react-mde';
import * as Showdown from "showdown";
import "react-mde/lib/styles/css/react-mde-all.css";

const converter = new Showdown.Converter({
  tables: true,
  simplifiedAutoLink: true,
  strikethrough: false,
  tasklists: true
});

class TextEditor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      _id: this.props._id || undefined,
      title: this.props.title || "",
      notes: this.props.notes || "",
      selectedTab: "preview"
    }

    this._deleteNote = this._deleteNote.bind(this);
    this._handleChange = this._handleChange.bind(this);
    this._handleTitleChange = this._handleTitleChange.bind(this);
    this._saveNote = this._saveNote.bind(this);
    this._changeTab = this._changeTab.bind(this);
  }

  _deleteNote() {
    this.props.deleteNoteHandler(this.state._id);
  }

  _handleTitleChange(e) {
    const {name, value} = e.target;
    this.setState({
      [name]: value
    });
  }

  _handleChange(value) {
   this.setState({
     notes: value
   });
  }

  _changeTab(e) {
    this.setState({
        selectedTab: e
    });
  }

  _saveNote() {
    const {title, notes} = this.state
    
    title !== "" && notes !== "" ? 
      this.props.saveHandler(title, notes) :
      this.props.cancelHandler();
  }

  render() {
    const tab = this.state.selectedTab;
    const deleteButton = <Button className="saveCancel" handler={this._deleteNote} name="Delete" id="delete"/>
    return(
      <div className="textEditor">
        <input
          id="titleText"
          name="title" 
          onChange={this._handleTitleChange}
          type="text"
          value={this.state.title || ""}
          placeholder="Title..."
        />
        <div className="containter" id="mde">
          <ReactMde
            className= {tab === "write" ? "":"mdeEditor"}
            value={this.state.notes}
            onChange={this._handleChange}
            selectedTab={this.state.selectedTab}
            onTabChange={this._changeTab}
            generateMarkdownPreview={markdown =>
              Promise.resolve(converter.makeHtml(markdown))
            }
            minEditorHeight={600}
            maxEditorHeight={600}
            minPreviewHeight={600}
          />
        </div>
        <div className="modal-button-row" style={{marginRight:"143px"}}>
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
