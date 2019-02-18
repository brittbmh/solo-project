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



class LandingHostItems extends Component {

    moveToHost = () => {
        console.log(this.props.event);
        const event = { eventId: this.props.event.id };
        this.props.dispatch({ type: 'SET_EVENT_ID', payload: event });
        this.props.moveToEvent('/hostpage');
    }

    render() {
        console.log(this.props.event);
        
        if (this.props.event.length === 0){
            return (
                <div>
                    <p>You are not hosting any events.</p>
                </div>
            )
        } else {
        return (
            <div>
                <Grid item md={2}>
                    <Card className="host-card">
                        <CardContent>
                            <Typography>{this.props.event.title}</Typography>
                            <Typography>{moment(this.props.event.date).format('MM/DD/YYYY')}</Typography>
                            <CardActions>
                                <Button onClick={this.moveToHost} size="small">Event Page</Button>
                            </CardActions>
                        </CardContent>
                    </Card>
                </Grid>
            </div>
        )
    }}
}

export default connect()(LandingHostItems);