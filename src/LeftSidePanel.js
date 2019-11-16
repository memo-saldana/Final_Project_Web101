import './App.css';
import AddCategoryForm from './AddCategoryForm';
import CategoryButton from './CategoryButton';
import React from 'react';

class LeftPanel extends React.Component {
  render() {
    return (
      <div className="leftPanel">
        {this.props.categories.map(category => (
          <CategoryButton
            className="categoryButton"
            handler={this.props.handler}
            key={category.name}
            name={category.name}
            id={category.name === this.props.selectedCategory ? "selectedCategory" : ""}
          />
        ))}
        <AddCategoryForm hidden={this.props.hidden} addCategoryHandler={this.props.addCategoryHandler}/>
        <CategoryButton
          id="addCategory"
          className="categoryButton"
          name="Add Category"
          handler={this.props.hideHandler}
        />
      </div>
    );
  }
}

export default LeftPanel;
