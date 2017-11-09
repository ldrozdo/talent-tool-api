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
import { Button, Alert} from 'react-bootstrap';

class Languages extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      isEditing: false,
      language: this.props.language,
      selectedLanguage: null,
      languages: this.props.languages,
      isCreating: false,
      errorMessage: null
    };

    this.onLanguageClicked = this.onLanguageClicked.bind(this);
    this.onLanguageUpdated = this.onLanguageUpdated.bind(this);
    this.onLanguageDeleted = this.onLanguageDeleted.bind(this);
    this.toggleCreating = this.toggleCreating.bind(this);
    this.handleCreating = this.handleCreating.bind(this);
  }

  onLanguageClicked(langIndex) {
    this.setState({isCreating: false});
    this.setState({ selectedLanguage: langIndex });
    this.setState({ errorMessage: null });
  }

  onLanguageUpdated(language){
    if (language.id && this.state.errorMessage != null){
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
    this.setState({ errorMessage: null });
    this.state.selectedLanguage = null;
    this.setState({isCreating: true});
  }

  handleCreating(errorMessage){
    this.state.selectedLanguage = null;
    this.setState({isCreating: false});
    if (errorMessage) {
      this.setState({errorMessage: errorMessage});
    }
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
              {this.state.errorMessage &&
                <Alert bsStyle="warning">
                  <p>{this.state.errorMessage}</p>
                </Alert>
              }
              {selectedLanguage !== null && <LanguagePage language={this.props.languages[selectedLanguage] }
              onLanguageUpdated={this.onLanguageUpdated} onLanguageDeleted={this.onLanguageDeleted}
              handleCreating={this.handleCreating} />}
              {this.state.isCreating !== false && <NewLanguagePage handleCreating={this.handleCreating} />}
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
