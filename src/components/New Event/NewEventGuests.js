import React, {Component} from 'react';
import {connect} from 'react-redux';

class NewEventGuests extends Component {
    constructor(props){
        super(props);
        this.state = {
            guest: '',
            email: ''
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        const target = event.target;
        const value = event.target.value;
        const name = target.name;

        this.setState({
            [name]: value
        })
    }

    addGuest = (event) => {
        event.preventDefault();
        this.props.dispatch({type: 'ADD_GUEST', payload: this.state })
    }
    render() {
        return (
            <div>
                <h3>Enter Guest Information</h3>
                <input name="guest" type="text" placeholder="Guest Name" onChange={this.handleChange} />
                <input name="email" type="text" placeholder="Guest Email" onChange={this.handleChange} />
                <button onClick={this.addGuest}>Add Guest</button>
                {JSON.stringify(this.state)}
            </div>
        )
    }
}

export default connect()(NewEventGuests);