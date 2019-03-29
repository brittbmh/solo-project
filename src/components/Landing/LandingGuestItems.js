import React, { Component } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';

//card styling
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import { withStyles, MuiThemeProvider } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
    palette: {
        primary: { main: '#e5e3f4' }, // Purple and green play nicely together.
        secondary: { main: '#11cb5f' }, // This is just green.A700 as hex.
    },
    typography: { useNextVariants: true },
});

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    card: {
        minWidth: 175,
        height: 250,
    },
    control: {
        padding: theme.spacing.unit * 2,
    },
    paper: {
        height: 200,
        width: 160,
        textAlign: 'center',
    },
    pos: {
        marginBottom: 4,
        fontSize: 16,
    },
    title: {
        fontSize: 16,
    },
    CardActions: {
        justifyContent: 'center',
    }
});

class LandingGuestItems extends Component {

    moveToGuest = () => {
        console.log(this.props.event);
        const event = { eventId: this.props.event.event_id };
        this.props.dispatch({ type: 'SET_EVENT_ID', payload: event });
        let attendance;
        if (this.props.event.attending === null) {
            attendance = '/RSVP';
        } else {
            attendance = '/view';
        }
        this.props.moveToEvent(`/guestpage${attendance}`);
    }

    render() {
        let attending;
        if (this.props.event.attending === null) {
            attending = 'You have not responded';
        } else if (this.props.event.attending === true) {
            attending = 'You are attending';
        } else if (this.props.event.attending === false) {
            attending = 'You are not attending';
        }

        const { classes } = this.props;
        return (
            <div>
                <Grid className="innerGrid" item xs={6}>
                    <Paper className={classes.paper}>
                        <Card className={classes.card} className="guest-card">
                            <MuiThemeProvider theme={theme}>
                                <CardContent>
                                    <Typography className={classes.title}>{this.props.event.title}</Typography>
                                    <Typography>{moment(this.props.event.date).format('MM/DD/YYYY')}</Typography>
                                    <Typography>Host: {this.props.event.first_name} {this.props.event.last_name}</Typography>
                                    <Typography className={classes.pos} color="Primary">{attending}</Typography>
                                    <CardActions className={classes.CardActions}>
                                        <Button className="eventButton" onClick={this.moveToGuest} size="small">event page</Button>
                                    </CardActions>                                  
                                </CardContent>
                            </MuiThemeProvider>
                        </Card>
                    </Paper>
                </Grid>
            </div>
        )
    }
}

LandingGuestItems.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(connect()(LandingGuestItems));