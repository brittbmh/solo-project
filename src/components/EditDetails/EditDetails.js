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
            description: event.description,
            time_start: event.time_start,
            end_time: event.end_time,
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
        newDetails.id = this.props.currentEvent.id;
        this.props.dispatch({type:'EDIT_DETAILS', payload: newDetails});
        this.props.history.push('/hostpage');
    }

    render(){
        const event = this.props.currentEvent;
        return(
            <div>
                <h3>{event.title}</h3>
                <form onSubmit={this.updateDetails}>
                <h4>Update details and click submit</h4>
                    <input name="title" value={this.state.title} placeholder="Name of Event" onChange={this.handleChange} />
                    <input name="date" value={moment(this.state.date).format('MM/DD/YYYY')} placeholder="Date" onChange={this.handleChange} />
                    <input name="time_start" value={this.state.time_start} placeholder="Start Time" onChange={this.handleChange} />
                    <input name="end_time" value={this.state.end_time} placeholder="End Time" onChange={this.handleChange} />
                    <input name="description" value={this.state.description} placeholder="Description" onChange={this.handleChange} />
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