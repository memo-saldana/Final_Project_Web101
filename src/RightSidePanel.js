import Button from './Button';
import Modal from 'react-modal';
import NoteTitle from './NoteTitle';
import React from 'react';
import TextEditor from './TextEditor';

class RightPanel extends React.Component   {

  constructor(props) {
    super(props); 
    
    this.state = {
      oldTitle: "",
      showModal: false,
      selectedContent: {}
    };

    this._handleCloseModal = this._handleCloseModal.bind(this);
    this._handleOpenModal = this._handleOpenModal.bind(this);
    this._handleSave = this._handleSave.bind(this);
  }

  _handleSave(title, notes) {
    const { oldTitle } = this.state;
    const selectedContent = {title, notes};

    this.props.editHandler(oldTitle, selectedContent);

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

  render() {
    return(
      <div className="rightPanel">
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
            notes={this.state.selectedContent.notes}
            saveHandler={this._handleSave}
            title={this.state.selectedContent.title}
          />
        </Modal>
      </div>
    );
  }
}

export default RightPanel;
