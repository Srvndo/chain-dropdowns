import React, { Component } from 'react';

import { UncontrolledDropdown, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import axios from 'axios';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';


class TrainingTags extends Component {
    constructor(props) {
        super(props);

        this.state = {
            training_tags: []
        }
    }

    componentDidMount() {
        let training = []
        axios.get('training-tags')
            .then(response => {
                response.data.map(tags => {
                    training.push(
                        <DropdownItem>
                            <h3>{ tags.tag }</h3>
                        </DropdownItem>
                    )
                })
            })
            .catch(error => { console.log(error) })

        this.setState({
            training_tags: training
        })
    }

    render() {
        return(
            <DropdownMenu>
                { this.state.training_tags }
            </DropdownMenu>
        );
    }
}

export default TrainingTags;