import React, {Component} from 'react';
import PropTypes from 'prop-types';
import TextInput from '../common/TextInput';

class LanguageForm extends React.Component {
  render() {
    return (
      <div>
        <form>
          <TextInput
            name="name"
            label="name"
            value={this.props.language.name}
            onChange={this.props.onChange}/>

            <input
             type="submit"
             disabled={this.props.saving}
             value={this.props.saving ? 'Language was successfully created!' : 'Save'}
             className="btn btn-primary"
             onClick={this.props.onSave}/>
        </form>
      </div>
  );
  }
}

LanguageForm.propTypes = {
  language: PropTypes.object.isRequired,
  onSave: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired
};

export default LanguageForm;
