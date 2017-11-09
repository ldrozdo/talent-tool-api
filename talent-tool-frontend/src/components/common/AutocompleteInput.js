import React  from 'react';
import PropTypes from 'prop-types';
import ReactAutocomplete from 'react-autocomplete';

class AutocompleteInput extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      value: '',
    };

    this.getItemsFromCategories = this.getItemsFromCategories.bind(this);
    this.onChange = this.onChange.bind(this);
    // this.onSelect = this.onSelect.bind(this);
  }

  onChange(e){
    e => this.setState({ value: e.target.value });
    this.props.onChange();
  }

  getItemsFromCategories(){
    let items = [];
    this.props.categories.map(category => {
      items.push({id: category.id, label: category.name})
    })
    return items
  }

  render() {
    return (
      <ReactAutocomplete
        items = {this.getItemsFromCategories()}
        shouldItemRender={(item, value) => item.label.toLowerCase().indexOf(value.toLowerCase()) > -1}
        getItemValue={item => item.label}
        renderItem={(item, highlighted) =>
          <div
            name={item.id}
            style={{ backgroundColor: highlighted ? '#eee' : 'white'}}>
            {item.label}
          </div>
        }
        value={this.state.value}
        onChange={e => this.setState({ value: e.target.value })}
        onSelect={this.props.onSelect}
      />
    )
  }
}

AutocompleteInput.propTypes = {
  categories: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  onSelect: PropTypes.string
};

export default AutocompleteInput;
