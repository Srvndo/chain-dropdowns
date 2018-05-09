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
        this.save = this.save.bind(this);
    }

    submit = (sub) => {
        let aux = this.state.training_items;
        sub.inference = this.state.inference
        sub.modifier = this.state.modifier
        
        aux.map(item => {
            if (item.id === sub.id){
                item = sub;
            }
        });

        this.setState({ training_items: aux });
    }

    save = () => {
        let data = [];
        this.state.training_items.map(item => {
            if(item.inference != null) {
                data.push( item )
            }
        });
        console.log(data);
        axios.post('updater/', data)
            .then(response => { 
                if(response.data.Result) {
                    alert("Save Successful");
                }
                else {
                    alert("Error while Saving data. Check the data!")
                }
            })
            .catch(error => { console.log(error) });
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
            <DropdownMenu className="p-2">
                <Form>
                    { this.state.training_tags }
                </Form>
                <br/>
                <div className="text-center">
                    <Button color="warning" 
                        size="lg" 
                        block
                        onClick={ this.save }
                    > Save 
                    </Button>
                </div>
            </DropdownMenu>
        );
    }
}

export default TrainingTags;