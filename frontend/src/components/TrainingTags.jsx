import React, { Component } from 'react';

import { DropdownMenu } from 'reactstrap';
import { Form, FormGroup, Label, Input } from 'reactstrap';

import axios from 'axios';

import CheckboxTag from './CheckboxItem.jsx'

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';


class TrainingTags extends Component {
    constructor(props) {
        super(props);

        this.state = {
            inference:props.inference,
            modifier: props.modifier,
            training_tags: []
        }
    }

    componentDidMount() {
        let training = []
        axios.get('inference-to-tag/?inference=' + this.state.inference + '&modifier=' + this.state.modifier)
            .then(response => {
                response.data.map(tags => {
                    training.push(
                        <CheckboxTag checked={ tags.checked } 
                            inference={ this.state.inference } 
                            modifier={ this.state.modifier }
                            tag={ tags.tag_id.tag }
                        />
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
                <Form>
                    { this.state.training_tags }
                </Form>
            </DropdownMenu>
        );
    }
}

export default TrainingTags;