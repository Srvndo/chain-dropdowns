import React, { Component } from 'react';

import { UncontrolledDropdown, DropdownToggle, DropdownMenu} from 'reactstrap';
import axios from 'axios';

import TrainingTags from './TrainingTags.jsx';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';


class TagModifier extends Component {
    constructor(props) {
        super(props);

        this.state = {
            inference: props.inference,
            tagModifiers: []
        }
    }


    componentDidMount() {
        let modifiers = []

        axios.get('tag-modifier')
            .then(response => {
                response.data.map((mod, index) => modifiers.push(
                        <UncontrolledDropdown key={index} direction="right">
                            <DropdownToggle caret color="info">
                                { mod.tag_modifier }
                            </DropdownToggle>
                            
                                <TrainingTags inference={ this.state.inference } modifier={ mod.id}/> 
                            
                        </UncontrolledDropdown>
                    )
                )
            })
            .catch(error => { console.log(error) })
        
            this.setState({
                tagModifiers: modifiers
            });
    }

    render() {
        return(
            <DropdownMenu>
                { this.state.tagModifiers }
            </DropdownMenu>
        );
    }
}

export default TagModifier;
