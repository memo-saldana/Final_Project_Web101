import LeftPanel from './LeftSidePanel';
import React from 'react';
import RightPanel from './RightSidePanel';

const MainPage = (props) => (
  <div className="App">
    <LeftPanel
      addCategoryHandler={props.addCategoryHandler}
      categories={props.categories}
      hideForm={props.hideForm}
      isFormShown={props.isFormShown}
      logoutHandler={props.logoutHandler}
      selectedCategory={props.selectedCategory.name}
      selectCatHandler={props.selectCatHandler}
    />
    <RightPanel
      contents={props.contents}
      categoryContents={props.selectedCategory.contents}
      deleteCatHandler={props.deleteCatHandler}
      deleteNoteHandler={props.deleteNoteHandler}
      editCatHandler={props.editCatHandler}
      editNoteHandler={props.editNoteHandler}
      showModalHandler={props.showModalHandler}
      title={props.selectedCategory.name}
      _id={props.selectedCategory._id}
    />
  </div>
);

export default MainPage
