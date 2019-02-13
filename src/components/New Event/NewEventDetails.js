import React, { Component } from 'react';
import { connect } from 'react-redux';

class NewEventDetails extends Component {
    constructor(props){
        super(props);
        this.state = {
            title: "Bee's Party",
            location: "Bee's House",
            startTime: "5:00",
            endTime: "11:00",
            description: "PARTY!!",
            date: "2/22/19"
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
        this.props.dispatch({type: 'CREATE_NEW_EVENT', payload: this.props.newParty})
        // this.props.history.push('/NewEvent/Guests')
    }

    render() {
        return (
            <div>
                <h3>Enter Party Information for Guests</h3>
                <form onSubmit={this.setDetails}>
                    <input name="title" placeholder="Name of Event" onChange={this.handleChange} />
                    <input name="date" placeholder="Date" onChange={this.handleChange} />
                    <input name="startTime" placeholder="Start Time" onChange={this.handleChange} />
                    <input name="endTime" placeholder="End Time" onChange={this.handleChange} />
                    <input name="description" placeholder="Description" onChange={this.handleChange} />
                    <input name="location" placeholder="Location" onChange={this.handleChange} />
                    <button type="submit">Create Event</button>
                </form>
                {JSON.stringify(this.state)}
                {JSON.stringify(this.props.newParty)}
            </div>
        )
    }
}

const mapReduxStoreToProps = (reduxStore) => ({
    newParty: reduxStore.events.setNewParty,
})

export default connect(mapReduxStoreToProps)(NewEventDetails);