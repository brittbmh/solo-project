import React, { Component } from 'react';
import { connect } from 'react-redux';

class NewEventDetails extends Component {
    constructor(props){
        super(props);
        this.state = {
        };
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

    setDetails = (event) => {
        event.preventDefault();
        this.props.dispatch({ type: 'SET_NEW_PARTY_DETAILS', payload: this.state });
        // this.props.history.push('/NewEvent/Guests')
    }

    render() {
        return (
            <div>
                <h3>Enter Party Information for Guests</h3>
                <form onSubmit={this.setDetails}>
                    <input name="Date" placeholder="Date" onChange={this.handleChange} />
                    <input name="StartTime" placeholder="Start Time" onChange={this.handleChange} />
                    <input name="EndTime" placeholder="End Time" onChange={this.handleChange} />
                    <input name="Description" placeholder="Description" onChange={this.handleChange} />
                    <input name="Location" placeholder="Location" onChange={this.handleChange} />
                    <button type="submit">Submit</button>
                </form>
                {JSON.stringify(this.state)}
            </div>
        )
    }
}

export default connect()(NewEventDetails);