import React, { Component } from 'react';
import { connect } from 'react-redux';
import LandingGuestItems from './LandingGuestItems';
import LandingHostItems from './LandingHostItems';
import './Landing.css';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';


const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    control: {
        padding: theme.spacing.unit * 2,
    },
    pos: {
        marginBottom: 12,
    },
});

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
                <h2>{this.props.user.first_name}'s Party List</h2>
                <h4>Events Attending:</h4>
                <Grid container className={classes.root} justify="center" spacing={Number(spacing)}>
                    {this.guestDetails()}
                </Grid>

                <br />
                
                <h4>Events Hosting:</h4>
                <Grid container className={classes.root} justify="center" spacing={Number(spacing)}>
                {this.hostDetails()}
                </Grid>
            </div >
        )
    }
}

const mapReduxStoreToProps = (reduxStore) => ({
    userGuestEvents: reduxStore.landing.setUserGuestEvents,
    userHostEvents: reduxStore.landing.setUserHostEvents,
    user: reduxStore.user
})

Landing.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(connect(mapReduxStoreToProps)(Landing));