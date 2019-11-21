import LeftPanel from './LeftSidePanel';
import React from 'react';
import RightPanel from './RightSidePanel';

const MainPage = (props) => (
  <div className="App">
    <LeftPanel
      addCategoryHandler={props.addCategoryHandler}
      categories={props.categories}
      selectCatHandler={props.selectCatHandler}
      isFormShown={props.isFormShown}
      hideForm={props.hideForm}
      selectedCategory={props.selectedCategory.name}
    />
    <RightPanel
      contents={props.contents}
      categoryContents={props.selectedCategory.contents}
      deleteCatHandler={props.deleteCatHandler}
      editCatHandler={props.editCatHandler}
      editNoteHandler={props.editNoteHandler}
      showModalHandler={props.showModalHandler}
      title={props.selectedCategory.name}
      _id={props.selectedCategory._id}
    />
  </div>
);

export default MainPage
