import React, { Component } from 'react';

import { Form, FormGroup, Label, Input } from 'reactstrap';


class CheckboxTag extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inference_map: props.inference_map,
            checked: props.inference_map.checked,
            tag: props.inference_map.tag
        }

        this.onChange = this.onChange.bind(this);
    }

    onChange = () => {
        let aux = this.state.inference_map;
        aux.checked = !this.state.checked;
        this.props.submit(aux);
        this.setState({ 
            checked: !this.state.checked,
            inference_map: aux
        });
    }

    submit = () => {
        
    }

    render(){
        return(
            <FormGroup check>
                <Label check>
                    <Input type="checkbox" checked={this.state.checked} onChange={this.onChange}/> { this.state.tag }
                </Label>
            </FormGroup>
        );
    }
}

export default CheckboxTag;