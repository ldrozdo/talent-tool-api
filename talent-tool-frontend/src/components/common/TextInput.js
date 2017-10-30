import React  from 'react';
import PropTypes from 'prop-types';

const TextInput = ({name, onChange, placeholder, value}) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{name}</label>
      <div className="field">
        <input
          type="text"
          name={name}
          className="form-control"
          placeholder={placeholder}
          value={value}
          onChange={onChange}/>
      </div>
    </div>
  );
};

TextInput.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string
};

export default TextInput;
