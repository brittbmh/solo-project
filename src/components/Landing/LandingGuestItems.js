import React, { Component } from 'react';
import moment from 'moment';
import {connect} from 'react-redux';

//card styling
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

class LandingGuestItems extends Component {

    moveToGuest = () => {
        console.log(this.props.event);
        const event = { eventId: this.props.event.event_id };
        this.props.dispatch({ type: 'SET_EVENT_ID', payload: event });
        this.props.moveToEvent('/guestpage');
    }

    render() {
        return (
            <div>
                <Grid item md={2}>
                    <Card className="guest-card">
                        <CardContent>
                            <Typography>{this.props.event.title}</Typography>
                            <Typography>{moment(this.props.event.date).format('MM/DD/YYYY')}</Typography>
                            <Typography>Host: {this.props.event.first_name} {this.props.event.last_name}</Typography>
                            <CardActions>
                                <Button onClick={this.moveToGuest} size="small">Event Page</Button>
                            </CardActions>
                        </CardContent>
                    </Card>
                </Grid>
            </div>
        )
    }
}

export default connect()(LandingGuestItems);