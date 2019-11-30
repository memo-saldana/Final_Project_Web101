import './App.css';
import Loader from 'react-loader-spinner';
import MainPage from './MainPage'
import Modal from 'react-modal';
import React from 'react';
import TextEditor from './TextEditor';
import axios from 'axios';

Modal.setAppElement('#root');

const URI = 'https://webdevclass-finalproject.herokuapp.com';
class MainApp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      info: {},
      isFetching: true,
      isFormShown: false,
      selectedCategory: {},
      showModal: false,
      error: ""
    };

    this._addCategory = this._addCategory.bind(this);
    this._addNotes = this._addNotes.bind(this);
    this._changeSelectedCategory = this._changeSelectedCategory.bind(this);
    this._deleteNote = this._deleteNote.bind(this);
    this._deleteCategory = this._deleteCategory.bind(this);
    this._editCategory = this._editCategory.bind(this);
    this._editNotes = this._editNotes.bind(this);
    this._handleCloseModal = this._handleCloseModal.bind(this);
    this._handleOpenModal = this._handleOpenModal.bind(this);
    this._showAddCategoryForm = this._showAddCategoryForm.bind(this);
  }

  componentDidMount() {
    let id = localStorage.getItem('userId');
    console.log('id :', id);
    let jwt = localStorage.getItem('token')
    console.log('jwt :', jwt);
    axios.get(URI+'/api/users/'+id+'/categories/notes',
    {
      headers: {
        'Authorization': 'Bearer '+ jwt
      }
    })
    .then(response => {
      console.log('response.data :', response.data);
      this.setState({
        info: response.data,
        selectedCategory: response.data.categories[0] || {},
        isFetching: false
      });
    })
    .catch(error => {
      if(error.response) {
        alert(error.response.data.message)
      }
      else alert(error.message)
    })
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
    const { categories } = this.state.info;
    const exists = categories.some(cat => cat.name === categoryName);
    
    if(categoryName !== "" && !exists){
      axios.post(URI+'/api/users/'+localStorage.getItem('userId')+'/categories',
      {
        name: categoryName
      },{
        headers: {
          "Authorization": 'Bearer '+localStorage.getItem('token')
        }
      })
      .then(response => {
        let {category} = response.data;
        const categorySet = [...this.state.info.categories, category];
        const  { info } = this.state;
        info.categories = categorySet;
  
        this.setState({ info });
        this.setState({ isFormShown: false });
      }).catch(error => {
        if(error.response) {
          alert(error.response.data.message)
        }
        else alert(error.message)
        
      });
    }

  }

  _addNotes(title, text) {
    console.log('text :', text);
    let { selectedCategory } = this.state
    const exists = selectedCategory.notes.some(note => note.title === title);
    
    if(!exists) {
      axios.post(URI+'/api/users/'+localStorage.getItem('userId')+'/categories/'+selectedCategory._id+'/notes',
      { title, text},
      {
        headers: {
          "Authorization": 'Bearer '+localStorage.getItem('token')
        }
      })
      .then(response => {
        const { notes } = selectedCategory;
        selectedCategory.notes = [...notes, response.data.note];
        this.setState({
          selectedCategory,
          showModal: false
        });
      }).catch(error => {
        if(error.response) {
          alert(error.response.data.message)
        }
        else alert(error.message)
      });
  
    } else {
      alert(`The title ${title} already exists`);
    }
  }

  _editNotes(_id, editedContent) {
    let { selectedCategory } = this.state;
    let index = selectedCategory.notes.findIndex(c => c._id === _id);
    axios.put(URI+'/api/users/'+
              localStorage.getItem('userId')+
              '/categories/'+selectedCategory._id+
              '/notes/'+_id,
              {
                title: editedContent.title,
                text: editedContent.text
              },{
                headers:{
                  "Authorization":'Bearer '+localStorage.getItem('token')
                }
              })
      .then(response => {
        selectedCategory.notes[index] = response.data.note;
        this.setState({selectedCategory})
      }).catch(error => {
        if(error.response) {
          alert(error.response.data.message)
        }
        else alert(error.message)
      });
  }

  _deleteNote(_id) {
    let { selectedCategory } = this.state;
    selectedCategory.notes = selectedCategory.notes.filter(c => c._id !== _id);
    this.setState({
      selectedCategory
    })
  }

  _editCategory(newCatName) {
    let newCat = this.state.selectedCategory;
    newCat.name = newCatName;

    this.setState({
      selectedCategory: newCat
    });   
  }

  _deleteCategory(_id) {
    let { info } = this.state;
    info.categories = info.categories.filter(cat => cat._id !== _id);

    this.setState({
      info,
      selectedCategory: info.categories[0],
    });
  }
  
  _handleCloseModal() {
    this.setState({ showModal: false });
  }

  _handleOpenModal() {
    this.setState({ showModal: true });
  }

  render() {
    return (
      <div className="App">
        {this.state.isFetching ? 
          <div className="loaderContainer">
            <Loader
              type="Puff"
              color="#ffd000"
              height={200}
              width={200}
              timeout={3000}
            />
          </div>:
          <div>
            <MainPage
              addCategoryHandler={this._addCategory}
              categories={this.state.info.categories}
              contents={this.state.selectedCategory.notes || []}
              deleteCatHandler={this._deleteCategory}
              deleteNoteHandler={this._deleteNote}
              editCatHandler={this._editCategory}
              editNoteHandler={this._editNotes}
              hideForm={this._showAddCategoryForm}
              isFormShown={this.state.isFormShown}
              logoutHandler={this.props.logoutHandler}
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
              <TextEditor cancelHandler={this._handleCloseModal} saveHandler={this._addNotes} selectedTab="write"/>
            </Modal>
          </div>
        }
      </div>
    );
  }
}

export default MainApp;
