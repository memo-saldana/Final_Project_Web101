import './App.css';
import data from './dummy';
import Loader from 'react-loader-spinner';
import MainPage from './MainPage'
import Modal from 'react-modal';
import React from 'react';
import TextEditor from './TextEditor';

Modal.setAppElement('#root');

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      info: {},
      isFetching: true,
      isFormShown: false,
      selectedCategory: {},
      showModal: false
    };

    this._addCategory = this._addCategory.bind(this);
    this._addNotes = this._addNotes.bind(this);
    this._changeSelectedCategory = this._changeSelectedCategory.bind(this);
    this._editNotes = this._editNotes.bind(this);
    this._handleCloseModal = this._handleCloseModal.bind(this);
    this._handleOpenModal = this._handleOpenModal.bind(this);
    this._showAddCategoryForm = this._showAddCategoryForm.bind(this);
  }

  componentDidMount() {
    // fetch here
    let info = data.find(obj => obj.userName === 'Emilio');
    
    this.setState({
      info,
      selectedCategory: info.categories[0],
      isFetching: false
    });
  }

  _changeSelectedCategory(e) {
    const categoryName = e.target.getAttribute('name');

    let { categories } = this.state.info;
    categories = categories.filter(obj => obj.name === categoryName)[0];

    this.setState({
      selectedCategory: categories
    });
  }

  _showAddCategoryForm() {
    this.setState(prevState => {
      return {
        isFormShown: !prevState.isFormShown
      }
    })
  }

  _addCategory(categoryName) {
    let { categories } = this.state.info;
    let exists = categories.some(cat => cat.name === categoryName);
    
    if(categoryName !== "" && !exists){
      const newCategory = {
        "name": categoryName,
        "contents": []
      }
  
      const categorySet = [...this.state.info.categories, newCategory];
      const  { info } = this.state;
      info.categories = categorySet;
  
      this.setState({ info });
    }

    this.setState({ isFormShown: false });
  }

  _addNotes(title, notes) {
    let {info, selectedCategory} = this.state

    const exists = selectedCategory.contents.some(note => note.title === title);
    
    if(!exists) {
      const newNote = { title, notes };
  
      let { contents } = selectedCategory;
      contents = [...contents, newNote];
  
      let updatedCat = info.categories.filter(cat => cat.name === selectedCategory.name)[0];
      updatedCat.contents = contents
  
      this.setState({
        info,
        showModal: false
      });
    } else {
      alert(`The title ${title} already exists`);
    }
  }

  _editNotes(oldTitle, editedContent) {
    let { selectedCategory } = this.state;
    let index = selectedCategory.contents.findIndex(c => c.title === oldTitle);

    selectedCategory.contents[index] = editedContent;
    
    this.setState({
      selectedCategory
    });
  }

  _handleCloseModal() {
    this.setState({ showModal: false });
  }

  _handleOpenModal() {
    this.setState({ showModal: true });
  }

  render() {
    console.log(this.state.info);
    return (
      <div>
        {this.state.isFetching ? 
          <div className="loaderContainer">
            <Loader
              type="Puff"
              color="#ffd000"
              height={200}
              width={200}
              timeout={3000}
            />
          </div> :
          <div>
            <MainPage
              addCategoryHandler={this._addCategory}
              categories={this.state.info.categories}
              contents={this.state.selectedCategory.contents}
              editHandler={this._editNotes}
              hideForm={this._showAddCategoryForm}
              isFormShown={this.state.isFormShown}
              selectCatHandler={this._changeSelectedCategory}
              selectedCategory={this.state.selectedCategory}
              showModalHandler={this._handleOpenModal}
            />
            <Modal 
              ariaHideApp={true}
              isOpen={this.state.showModal}
              className="Modal"
              overlayClassName="Overlay"
            >
              <TextEditor cancelHandler={this._handleCloseModal} saveHandler={this._addNotes}/>
            </Modal>
          </div>
        }
      </div>
    );
  }
}

export default App;
