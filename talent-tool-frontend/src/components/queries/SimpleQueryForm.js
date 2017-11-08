import React, {Component} from 'react';
import PropTypes from 'prop-types';
import TextInput from '../common/TextInput';

class CategoryForm extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <form>
          <TextInput
            name="name"
            label="name"
            value={this.props.query.name}
            onChange={this.props.onChange}/>

            <input
             type="submit"
             disabled={this.props.saving}
             value={'Save'}
             className="btn btn-primary"
             onClick={this.props.onSave}/>
        </form>
      </div>
  );
  }
}

CategoryForm.propTypes = {
  category: PropTypes.object.isRequired,
  onSave: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  translations: PropTypes.array.isRequired
};

export default CategoryForm;
