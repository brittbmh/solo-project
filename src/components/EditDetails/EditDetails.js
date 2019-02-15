import React, {Component} from 'react';
import {connect} from 'react-redux';

class EditDetails extends Component {
    constructor(props) {
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

    render(){
        const event = this.props.currentEvent;
        return(
            <div>
                <h3>{event.title}</h3>
                <form onSubmit={this.setDetails}>
                    <input name="title" placeholder="Name of Event" onChange={this.handleChange} />
                    <input name="date" placeholder="Date" onChange={this.handleChange} />
                    <input name="startTime" placeholder="Start Time" onChange={this.handleChange} />
                    <input name="endTime" placeholder="End Time" onChange={this.handleChange} />
                    <input name="description" placeholder="Description" onChange={this.handleChange} />
                    <input name="location" placeholder="Location" onChange={this.handleChange} />
                    <button type="submit">Update Event</button>
                </form>




            </div>
        )
    }
}

const mapReduxStoreToProps = (reduxStore) => ({
    currentEvent: reduxStore.events.currentEvent,
})

export default connect(mapReduxStoreToProps)(EditDetails);