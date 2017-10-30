import React from 'react';
import {connect} from 'react-redux';
import * as languageActions from '../../actions/languageActions';
import PropTypes from 'prop-types';
import { Nav, NavItem, Grid, Row, Col} from 'react-bootstrap';
import LanguageList from './LanguageList';
import LanguagePage from './LanguagePage';
import NewLanguagePage from './NewLanguagePage';
import { withRouter } from 'react-router-dom';
import {bindActionCreators} from 'redux';
import { Button} from 'react-bootstrap';

class Languages extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      isEditing: false,
      language: this.props.language,
      selectedLanguage: null,
      languages: this.props.languages,
      isCreating: false
    };

    this.onLanguageClicked = this.onLanguageClicked.bind(this);
    this.onLanguageUpdated = this.onLanguageUpdated.bind(this);
    this.onLanguageDeleted = this.onLanguageDeleted.bind(this);
    this.toggleCreating = this.toggleCreating.bind(this);
  }

  onLanguageClicked(langIndex) {
    this.setState({isCreating: false});
    this.setState({ selectedLanguage: langIndex });
  }

  onLanguageUpdated(language){
    if (language.id){
      this.setState({ language: language });
      this.props.languages[this.state.selectedLanguage] = language;
      this.setState({ languages: this.props.languages });
    }
  }

  onLanguageDeleted(){
    this.setState({isCreating: false});
    this.setState({selectedLanguage: null});
  }

  toggleCreating() {
    this.state.selectedLanguage = null;
    this.setState({isCreating: true});
  }

  render() {
    const { selectedLanguage } = this.state;

    return(
      <Grid>
        <Row className="show-grid">
          <Col xs={3} md={3}>
          <h2>Languages &nbsp;
          <Button bsSize="xsmall" onClick={this.toggleCreating}> + Language</Button>
          </h2>
          <LanguageList languages={this.props.languages} onLanguageClicked={this.onLanguageClicked}  />
          </Col>
          <Col xs={8} md={8}>
              {selectedLanguage !== null && <LanguagePage language={this.props.languages[selectedLanguage]}
              onLanguageUpdated={this.onLanguageUpdated} onLanguageDeleted={this.onLanguageDeleted}/>}
              {this.state.isCreating !== false && <NewLanguagePage />}
          </Col>

        </Row>
      </Grid>
    )
  }
}


Languages.propTypes = {
  languages: PropTypes.array.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    languages: state.languages
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(languageActions, dispatch)
  };
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Languages));
