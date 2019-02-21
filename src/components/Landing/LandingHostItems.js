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
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

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
        height: 160,
        width: 160,
        textAlign: 'center',
    },
    pos: {
        marginBottom: 4,
        fontSize: 18,
    },
    title: {
        fontSize: 16,
    },
    CardActions: {
        justifyContent: 'center',
    }
});

class LandingHostItems extends Component {

    moveToHost = () => {
        console.log(this.props.event);
        const event = { eventId: this.props.event.id };
        this.props.dispatch({ type: 'SET_EVENT_ID', payload: event });
        this.props.moveToEvent('/hostpage');
    }

    render() {
        console.log(this.props.event);

        const { classes } = this.props;

        if (this.props.event.length === 0) {
            return (
                <div>
                    <p>You are not hosting any events.</p>
                </div>
            )
        } else {
            return (
                <div>
                    <Grid className="innerGrid" item xs={6}>
                        <Paper className={classes.paper}>
                            <Card className={classes.card} className="host-card">
                                <CardContent>
                                    <Typography className={classes.title}>{this.props.event.title}</Typography>
                                    <Typography>{moment(this.props.event.date).format('MM/DD/YYYY')}</Typography>
                                    <CardActions className={classes.CardActions}>
                                        <Button onClick={this.moveToHost} size="small">Event Page</Button>
                                    </CardActions>
                                </CardContent>
                            </Card>
                        </Paper>
                    </Grid>
                </div>
            )
        }
    }
}

LandingHostItems.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(connect()(LandingHostItems));