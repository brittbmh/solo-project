import React, {Component} from 'react';
import {connect} from 'react-redux';
import moment from 'moment';
import GuestPageRSVP from './GuestPageRSVP';

class GuestPage extends Component {
    

    componentDidMount() {
        this.props.dispatch({ type: 'GET_PARTY_DETAILS', payload: this.props.currentEvent.eventId });
        this.props.dispatch({ type: 'GET_GUEST_LIST', payload: this.props.currentEvent.eventId });
        this.props.dispatch({ type: 'GET_INFO_FIELDS', payload: this.props.currentEvent.eventId })
    }    

    render() {
        const event = this.props.currentEvent;

        return (
            <div>
                {event.length}
                <h3>{event.title}</h3>
                <p>Date: {moment(event.date).format('MM/DD/YYYY')}</p>
                <p>Time: {event.time_start} - {event.end_time}</p>
                <p>{event.description}</p>
                <h5>Location: {event.location}</h5>
                <br />
                <GuestPageRSVP infoFields={this.props.infoFields}/>
            </div>
        )
    }
}


const mapReduxStoreToProps = (reduxStore) => ({
    currentEvent: reduxStore.events.currentEvent,
    guestList: reduxStore.host.setGuestList,
    infoFields: reduxStore.host.setInfoFields,
})

export default connect(mapReduxStoreToProps)(GuestPage);