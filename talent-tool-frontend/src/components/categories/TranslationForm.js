import React, {Component} from 'react';
import PropTypes from 'prop-types';
import TextInput from '../common/TextInput';

class TranslationForm extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <div>
        <form>
        <TextInput
          name="translated_query"
          value={this.props.translation.translated_query}
          onChange={this.props.onChange} />

          <input
           type="submit"
           className="btn btn-primary"
           onClick={this.props.onSave}
           value = 'Update Translation'/>
        </form>
      </div>
  );
  }
}

TranslationForm.propTypes = {
  translation: PropTypes.object.isRequired,
  onSave: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default TranslationForm;
