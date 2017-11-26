import React, {Component} from 'react';

class Footer extends React.Component {
  render() {
    var year = (new Date()).getFullYear();
    return (
      <div class="navbar navbar-default navbar-fixed-bottom">
        <div class="container">
          <p class="navbar-text pull-left">© {year} - Created by: Lucia Bahútová,
          Faculty of Informatics, Masaryk University
          </p>
        </div>
      </div>
  );
  }
}

export default Footer;
