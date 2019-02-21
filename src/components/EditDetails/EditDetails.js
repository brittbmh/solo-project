import React, {Component} from 'react';
import {connect} from 'react-redux';
import moment from 'moment';

class EditDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount(){
        const event = this.props.currentEvent;
        this.setState({
            title: event.title,
            location: event.location,
            desc: event.description,
            startTime: event.time_start,
            endTime: event.end_time,
            date: event.date,
        })
    }

    handleChange(event) {
        const target = event.target;
        const value = event.target.value;
        const name = target.name;

        this.setState({
            [name]: value
        })
    }

    updateDetails = () => {
        const newDetails = this.state;
        newDetails.eventId = this.props.currentEvent.id;
        this.props.dispatch({type:'EDIT_DETAILS', payload: newDetails});
    }

    render(){
        const event = this.props.currentEvent;
        return(
            <div>
                <h3>{event.title}</h3>
                {JSON.stringify(event)}
                <form onSubmit={this.updateDetails}>
                    <input name="title" value={this.state.title} placeholder="Name of Event" onChange={this.handleChange} />
                    <input name="date" value={moment(this.state.date).format('MM/DD/YYYY')} placeholder="Date" onChange={this.handleChange} />
                    <input name="startTime" value={this.state.startTime} placeholder="Start Time" onChange={this.handleChange} />
                    <input name="endTime" value={this.state.endTime} placeholder="End Time" onChange={this.handleChange} />
                    <input name="description" value={this.state.desc} placeholder="Description" onChange={this.handleChange} />
                    <input name="location" value={this.state.location} placeholder="Location" onChange={this.handleChange} />
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