import React, { Component } from 'react';
import { connect } from 'react-redux';
import swal from 'sweetalert';

class NewEventDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            location: "",
            startTime: "",
            endTime: "",
            description: "",
            date: ""
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
        const newParty = this.props.newParty;
        newParty.partyDetails = this.state;
        this.props.dispatch({ type: 'CREATE_NEW_EVENT', payload: newParty });
        //swal alerts the user and gives the server time to post the party details to the db
        swal({
            text: 'New party created',
            button: {
                text: 'OK',
                closeModal: true,
            },
        })
            .then(() => {
            this.props.history.push('/NewEvent/Guests');
        }).catch(error => {
            swal('Something went wrong')
        })
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