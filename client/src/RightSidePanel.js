import Button from './Button';
import Modal from 'react-modal';
import NoteTitle from './NoteTitle';
import React from 'react';
import TextEditor from './TextEditor';

class RightPanel extends React.Component   {

  constructor(props) {
    super(props); 
    
    this.state = {
      categoryName: this.props.title || "",
      oldCatName: this.props.title || "",
      _id: "",
      showModal: false,
      selectedContent: {}
    };

    this._deleteCategory = this._deleteCategory.bind(this);
    this._deleteNote = this._deleteNote.bind(this);
    this._editCatTitle = this._editCatTitle.bind(this);
    this._handleCloseModal = this._handleCloseModal.bind(this);
    this._handleOpenModal = this._handleOpenModal.bind(this);
    this._handleSave = this._handleSave.bind(this);
    this._handleChange = this._handleChange.bind(this);
  }

  _handleSave(title, text) {
    const { _id } = this.state;
    const selectedContent = {title, text};
    this.props.editNoteHandler(_id, selectedContent);

    this.setState({
      _id: "",
      showModal: false,
      selectedContent: {}
    });
  }

  _handleCloseModal() {
    this.setState({ 
      showModal: false,
      selectedContent: {}
    });
  }

  _handleOpenModal(e) {
    const selTitle = e.target.getAttribute('name');
    const selectedContent = this.props.categoryContents.filter(cont => cont.title === selTitle)[0];

    this.setState({ 
      _id: selectedContent._id,
      showModal: true,
      selectedContent
    });
  }

  _handleChange(e) {
    const {name, value} = e.target;

    this.setState({
      [name]: value
    })
  }

  _editCatTitle() {
    const {categoryName} = this.state;
    this.props.editCatHandler(categoryName);
  }

  _deleteCategory() {
    console.log('this.props._id :', this.props._id);
    this.props.deleteCatHandler(this.props._id);
  }

  _deleteNote(_id) {
    this.setState({
      showModal: false
    })
    this.props.deleteNoteHandler(_id);
  }

  componentDidUpdate(prevProps) {
    if(this.props.title !== prevProps.title) {
      this.setState({
        categoryName: this.props.title,
        oldCatName: this.props.title,
      })
    }
  }

  render() {
    let noteHandler = this.state.categoryName === "" ? null : this.props.showModalHandler;
    let disabled = this.state.categoryName === ""
                && this.state.oldCatName === "";
    return(
      <div className="rightPanel">
        <div className="catInfo">
          <input
            className="addCategoryForm"
            id="titleCategory"
            name="categoryName" 
            onChange={this._handleChange}
            placeholder="Category Title"
            type="text"
            value={this.state.categoryName}
            disabled={disabled}
          />
          <div style={{display:"flex", flexDirection:"row", width: "67%", justifyContent: "flex-end"}}>
            <Button 
              className="editDelete"
              handler={this._editCatTitle}
              id="edit"
              name="Edit"
            />
            <Button 
              className="editDelete"
              handler={this._deleteCategory}
              id="delete"
              name="Delete"
            />
          </div>
        </div>
        {this.props.contents.map(content => (
          <NoteTitle
            key={content._id}
            title={content.title}
            handleOpenModal={this._handleOpenModal}
          />
        ))}
        <Button
          className="addNoteButton"
          handler={noteHandler}
          name="+"
        />
        <Modal
          ariaHideApp={true}
          isOpen={this.state.showModal}
          className="Modal"
          overlayClassName="Overlay"
        >
          <TextEditor 
            cancelHandler={this._handleCloseModal}
            deleteButton={true}
            deleteNoteHandler={this._deleteNote}
            _id={this.state.selectedContent._id}
            text={this.state.selectedContent.text}
            saveHandler={this._handleSave}
            selectedTab="preview"
            title={this.state.selectedContent.title}
          />
        </Modal>
      </div>
    );
  }
}

export default RightPanel;
