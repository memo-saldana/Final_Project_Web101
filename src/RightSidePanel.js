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
      oldTitle: "",
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

  _handleSave(title, notes) {
    const { oldTitle } = this.state;
    const selectedContent = {title, notes};

    this.props.editNoteHandler(oldTitle, selectedContent);

    this.setState({
      oldTitle: "",
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
      oldTitle: selectedContent.title,
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
        oldCatName: ""
      })
    }
  }

  render() {
    let delHandler = this.state.categoryName === "" ? null : this._deleteNote;
    let disabled = this.state.categoryName === "";
    console.log(this.props);
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
              handler={delHandler}
              id="delete"
              name="Delete"
            />
          </div>
        </div>
        {this.props.contents.map(content => (
          <NoteTitle
            key={content.title}
            title={content.title}
            handleOpenModal={this._handleOpenModal}
          />
        ))}
        <Button
          className="addNoteButton"
          handler={this.props.showModalHandler}
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
            notes={this.state.selectedContent.notes}
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
