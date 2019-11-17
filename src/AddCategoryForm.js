import React from 'react';
import Button from './Button'

class AddCategoryForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      newCategoryName: ""
    }

    this._handleChage = this._handleChage.bind(this);
    this._addCategory = this._addCategory.bind(this);
  }

  _handleChage(e) {
    this.setState({
      newCategoryName: e.target.value
    });
  }

  _addCategory() {
    this.setState({
      newCategoryName: ""
    })
    this.props.addCategoryHandler(this.state.newCategoryName);
  }


  render() {
    return (
    <div className="formContainer">
      {this.props.hidden ? null : 
        <div>
          <p className="addFormTitle">Add Category:</p>
          <input
            className="addCategoryForm"
            onChange={this._handleChage}
            type="text"
            value={this.state.newCategoryName}
          />
          <Button 
            className="addCategoryButton"
            name="+"
            handler={this._addCategory}
          />
        </div>
      }
    </div>
    );
  }
}

export default AddCategoryForm;
