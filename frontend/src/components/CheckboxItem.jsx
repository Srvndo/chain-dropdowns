import React, { Component } from 'react';

import { Form, FormGroup, Label, Input } from 'reactstrap';


class CheckboxTag extends Component {
    constructor(props) {
        super(props);

        this.state = {
            inference:props.inference,
            modifier: props.modifier,
            checked: props.checked,
            tag: props.tag
        }

        this.onChange = this.onChange.bind(this);
    }

    onChange = () => {
        this.setState({ checked: !this.state.checked});
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