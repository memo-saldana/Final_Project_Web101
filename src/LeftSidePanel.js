import AddCategoryForm from './AddCategoryForm';
import Button from './Button';
import React from 'react';

const LeftPanel = (props) => (
  <div className="leftPanel">
    <p className="logout">Logout</p>
    {props.categories.map(category => (
      <Button
        className="categoryButton"
        handler={props.selectCatHandler}
        key={category.name}
        name={category.name}
        id={category.name === props.selectedCategory ? "selectedCategory" : ""}
      />
    ))}
    <AddCategoryForm show={props.isFormShown} addCategoryHandler={props.addCategoryHandler}/>
    <Button
      className="categoryButton"
      handler={props.hideForm}
      id="addCategory"
      name="Add Category"
    />
  </div>
);

export default LeftPanel;
