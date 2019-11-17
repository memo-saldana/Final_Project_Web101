import AddCategoryForm from './AddCategoryForm';
import Button from './Button';
import React from 'react';

const LeftPanel = (props) => (
  <div className="leftPanel">
    {props.categories.map(category => (
      <Button
        className="categoryButton"
        handler={props.handler}
        key={category.name}
        name={category.name}
        id={category.name === props.selectedCategory ? "selectedCategory" : ""}
      />
    ))}
    <AddCategoryForm hidden={props.hidden} addCategoryHandler={props.addCategoryHandler}/>
    <Button
      id="addCategory"
      className="categoryButton"
      name="Add Category"
      handler={props.hideHandler}
  />
  </div>
);

export default LeftPanel;
