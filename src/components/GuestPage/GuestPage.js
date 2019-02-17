import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import { Switch, Route } from 'react-router-dom';
import GuestPageRSVP from './GuestPageRSVP';
import GuestPageView from './GuestPageView';

class GuestPage extends Component {


    componentDidMount() {
        this.props.dispatch({ type: 'GET_PARTY_DETAILS', payload: this.props.currentEvent.eventId });
        this.props.dispatch({ type: 'GET_GUEST_LIST', payload: this.props.currentEvent.eventId });
        this.props.dispatch({ type: 'GET_INFO_FIELDS', payload: this.props.currentEvent.eventId });
        this.props.dispatch({ type: 'GET_GUEST_NAME' })
    }

    render() {
        const event = this.props.currentEvent;

        return (
            <div>
                <h3>Welcome, {this.props.guest.first_name}!</h3>
                {event.length}
                <h4>Event: {event.title}</h4>
                <p>Date: {moment(event.date).format('MM/DD/YYYY')}</p>
                <p>Time: {event.time_start} - {event.end_time}</p>
                <p>{event.description}</p>
                <h5>Location: {event.location}</h5>
                {JSON.stringify(event)}
                <br />
                <Switch>
                    <Route
                        path='/guestpage/RSVP' 
                        render={(props) => <GuestPageRSVP {...props}
                        eventId={event.id} infoFields={this.props.infoFields} />}
                    />
                    <Route path='/guestpage/view' 
                        render={(props) => <GuestPageView {...props}
                            eventId={event.id} infoFields={this.props.infoFields}/>}
                    />
                </Switch>
            </div>
        )
    }
}


const mapReduxStoreToProps = (reduxStore) => ({
    currentEvent: reduxStore.events.currentEvent,
    guestList: reduxStore.host.setGuestList,
    infoFields: reduxStore.host.setInfoFields,
    guest: reduxStore.guest.setGuestName
})

export default connect(mapReduxStoreToProps)(GuestPage);