import React, { Component } from 'react';

import { DropdownMenu, Button } from 'reactstrap';
import { Form } from 'reactstrap';

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
            training_tags: [],
            training_items: [],
            submit: false
        }

        this.submit = this.submit.bind(this);
    }

    submit = (sub) => {
        let aux = this.state.training_items;
        
        aux.map(item => {
            if (item.id === sub.item){
                item = sub;
            }
        });

        console.log(aux);
        this.setState({ training_items: aux });
    }

    componentDidMount() {
        let training = [];
        axios.get('inference-to-tag/?inference=' + this.state.inference + '&modifier=' + this.state.modifier)
            .then(response => {
                response.data.map(tags => {
                    training.push(
                        <CheckboxTag inference_map={ tags } submit={ this.submit }/>
                    )
                })

                this.setState({
                    training_tags: training,
                    training_items: response.data
                })
            })
            .catch(error => { console.log(error) })

        
    }

    render() {
        return(
            <DropdownMenu>
                <Form>
                    { this.state.training_tags }
                </Form>
                <br/>
                <div className="text-center">
                    <Button color="warning" 
                        size="lg" 
                        block
                    > Save 
                    </Button>
                </div>
            </DropdownMenu>
        );
    }
}

export default TrainingTags;