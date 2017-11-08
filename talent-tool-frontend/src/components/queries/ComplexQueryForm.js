import React, {Component} from 'react';
import PropTypes from 'prop-types';
import TextInput from '../common/TextInput';

class ComplexQueryForm extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <form>
          <TextInput
            name="name"
            label="Name of your query"
            value={this.props.query.name}
            onChange={this.props.onChange}/>

            <TextInput
              name="text_of_query"
              label="Text of query"
              value={this.props.query.text_of_query}
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

ComplexQueryForm.propTypes = {
  query: PropTypes.object.isRequired,
  onSave: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default ComplexQueryForm;
