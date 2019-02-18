import React, {Component} from 'react';
import { connect } from 'react-redux';
import LandingGuestItems from './LandingGuestItems';

class Landing extends Component{

    componentDidMount(){
        this.props.dispatch({type: 'GET_EVENTS'});
    }

    guestDetails = () => {
        return (
            this.props.userGuestEvents.map((guestEvent, i) => {
                return (<LandingGuestItems key={i} event={guestEvent[0]} />)
            })
        )
    }

    render(){
        return(
            <div>
                <h2>Party List</h2>
                <h4>Events Attending:</h4>
                {this.guestDetails()}
                <br/>
                <h4>Events Hosting:</h4>
                {JSON.stringify(this.props.userHostEvents)}


            </div>
        )
    }
}

const mapReduxStoreToProps = (reduxStore) => ({
    userGuestEvents: reduxStore.landing.setUserGuestEvents,
    userHostEvents: reduxStore.landing.setUserHostEvents
})

export default connect(mapReduxStoreToProps)(Landing);