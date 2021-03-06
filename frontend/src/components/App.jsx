import React, { Component } from 'react';

import { UncontrolledDropdown, DropdownToggle } from 'reactstrap';
import axios from 'axios';

import InferenceTag from './InferenceTags.jsx'

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';



class App extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      dropdownOpen: false,
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  
  render() {
    return (
      <div className="text-center">
        <br/>
        <UncontrolledDropdown>
          <DropdownToggle caret color="primary">
            Inferences Tags
          </DropdownToggle>
          <InferenceTag/>
        </UncontrolledDropdown>
      </div>
    );
  }
}

export default App;
