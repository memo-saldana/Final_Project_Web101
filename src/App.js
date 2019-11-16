import './App.css';
import data from './dummy';
import LeftPanel from './LeftSidePanel';
import Loader from 'react-loader-spinner';
import React from 'react';
import RightPanel from './RightSidePanel';


class App extends React.Component {
  constructor() {
    super();

    this.state = {
      isFetching: true,
      selectedCategory: [],
      info: {}
    };

    this._changeSelectedCategory = this._changeSelectedCategory.bind(this);
    this._showAddCategoryForm = this._showAddCategoryForm.bind(this);
    this._addCategory = this._addCategory.bind(this);
  }

  componentDidMount() {
    this.setState({
      info: data,
      selectedCategory: data.categories[0],
      isFetching: false,
      hiddenForm: true
    });
  }


  _changeSelectedCategory(e) {
    const categoryName = e.target.getAttribute('name');

    let newCategory = this.state.info.categories;
    newCategory = newCategory.filter(obj => obj.name === categoryName)[0];

    this.setState({
      selectedCategory: newCategory
    });
  }

  _showAddCategoryForm() {
    this.setState(prevState => {
      return {
        hiddenForm: !prevState.hiddenForm
      }
    })
  }

  _addCategory(categoryName) {
    const newCategory = {
      "name": categoryName,
      "contents": []
    }

    const categorySet = [...this.state.info.categories, newCategory];
    const newInfo = this.state.info;
    newInfo.categories = categorySet;

    this.setState({
      info: newInfo,
      hiddenForm: true
    })
  }

  render() {
    return (
      <div>
        {this.state.isFetching ? 
          <Loader
            type="Puff"
            color="#ffd000"
            height={100}
            width={100}
            timeout={3000}
          /> :
          <div className="App"> 
            <LeftPanel
              addCategoryHandler={this._addCategory}
              categories={this.state.info.categories}
              handler={this._changeSelectedCategory}
              hidden={this.state.hiddenForm}
              hideHandler={this._showAddCategoryForm}
              selectedCategory={this.state.selectedCategory.name}
            />
            <RightPanel contents={this.state.selectedCategory.contents}/>
          </div>
        }
      </div>
    );
  }
}

export default App;
