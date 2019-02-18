import React, { Component } from 'react';
import moment from 'moment';


import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

class LandingGuestItems extends Component {
    render() {
        return (
            <div>
                {JSON.stringify(this.props.event)}
                <Grid item md={2}>
                    <Card className="guest-card">
                        <CardContent>
                            <Typography>{this.props.event.title}</Typography>
                            <Typography>{moment(this.props.event.date).format('MM/DD/YYYY')}</Typography>
                            <Typography>Host: {this.props.event.first_name} {this.props.event.last_name}</Typography>
                            <CardActions>
                                <Button size="small">Event Page</Button>
                            </CardActions>
                        </CardContent>
                    </Card>
                </Grid>
            </div>
        )
    }
}

export default LandingGuestItems;