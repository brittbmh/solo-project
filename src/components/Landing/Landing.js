import React, { Component } from 'react';
import { connect } from 'react-redux';
import LandingGuestItems from './LandingGuestItems';
import LandingHostItems from './LandingHostItems';
import './Landing.css';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

class Landing extends Component {
    state = {
        spacing: '16',
    }

    componentDidMount() {
        this.props.dispatch({ type: 'GET_EVENTS' });
    }

    guestDetails = () => {
        if (this.props.userGuestEvents.length === 0) {
            return (
                <div>
                    <p>You are not attending any events.</p>
                </div>
            )
        } else {
            return (
                this.props.userGuestEvents.map((guestEvent, i) => {
                    return (<LandingGuestItems moveToEvent={this.moveToEvent} key={i} event={guestEvent} />)
                })
            )
        }
    }

    hostDetails = () => {
        if (this.props.userHostEvents.length === 0) {
            return (
                <div>
                    <p>You are not hosting any events.</p>
                </div>
            )
        } else {
            return (
                this.props.userHostEvents.map((hostEvent, i) => {
                    return (<LandingHostItems moveToEvent={this.moveToEvent} key={i} event={hostEvent} />)
                })
            )
        }
    }

    moveToEvent = (page) => {
        this.props.history.push(page);
    }

    render() {
        const { classes } = this.props;
        const { spacing } = this.state;
        return (
            <div>
                <h2>Party List</h2>
                <h4>Events Attending:</h4>
                
                        {this.guestDetails()}
                    
                

                <br />
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