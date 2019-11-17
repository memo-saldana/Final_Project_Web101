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
      selectedCategory={props.selectedCategory}
    />
    <RightPanel
      contents={props.contents}
      selectedCategory={props.selectedCategory}
      showModalHandler={props.showModalHandler}
    />
  </div>
);

export default MainPage
