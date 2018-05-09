import React, { Component } from 'react';

import { UncontrolledDropdown, DropdownToggle, DropdownMenu} from 'reactstrap';
import axios from 'axios';

import TagModifier from './TagModifiers.jsx'

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

class InferenceTag extends Component {
    constructor(props) {
        super(props)

        this.state = {
            inference: []
        }
    }

    componentDidMount() {
        let inferences = []

        axios.get('inference-tags')
        .then(response => {
          response.data.map((infer, index) => inferences.push(
                <UncontrolledDropdown key={index} direction="right">
                    <DropdownToggle caret color="success">
                        { infer.inference_tag }
                    </DropdownToggle>
                    <TagModifier inference={ infer.id }/>
                </UncontrolledDropdown>
            )
          )
        })
        .catch(error => { console.log(error)})  
    
        this.setState({
          inference: inferences
        })
    }

    render() {
        return (
            <DropdownMenu>
                { this.state.inference }
            </DropdownMenu>
        );
    }
}

export default InferenceTag;