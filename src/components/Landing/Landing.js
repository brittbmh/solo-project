import React, {Component} from 'react';
import { connect } from 'react-redux';
import LandingGuestItems from './LandingGuestItems';
import LandingHostItems from './LandingHostItems';
import './Landing.css';

class Landing extends Component{

    componentDidMount(){
        this.props.dispatch({type: 'GET_EVENTS'});
    }

    guestDetails = () => {
        return (
            this.props.userGuestEvents.map((guestEvent, i) => {
                return (<LandingGuestItems moveToEvent={this.moveToEvent} key={i} event={guestEvent} />)
            })
        )
    }

    hostDetails = () => {
        return (
            this.props.userHostEvents.map((hostEvent, i) => {
                return (<LandingHostItems moveToEvent={this.moveToEvent} key={i} event={hostEvent} />)
            })
        )
    }

    moveToEvent = (page) => {
        this.props.history.push(page);
    }

    render(){
        return(
            <div>
                <h2>Party List</h2>
                <h4>Events Attending:</h4>
                {this.guestDetails()}
                <br/>
                <h4>Events Hosting:</h4>
                {this.hostDetails()}

            </div>
        )
    }
}

const mapReduxStoreToProps = (reduxStore) => ({
    userGuestEvents: reduxStore.landing.setUserGuestEvents,
    userHostEvents: reduxStore.landing.setUserHostEvents
})

export default connect(mapReduxStoreToProps)(Landing);