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
        minWidth: 275,
    },
    paper: {
        height: 150,
        width: 160,
    },
    control: {
        padding: theme.spacing.unit * 2,
    },
    paper: {
        padding: theme.spacing.unit * 2,
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    pos: {
        marginBottom: 12,
    },
    title: {
        fontSize: 14,
    },
});

class LandingHostItems extends Component {

    state = {
        spacing: '24',
    }

    moveToHost = () => {
        console.log(this.props.event);
        const event = { eventId: this.props.event.id };
        this.props.dispatch({ type: 'SET_EVENT_ID', payload: event });
        this.props.moveToEvent('/hostpage');
    }

    render() {
        console.log(this.props.event);

        const { classes } = this.props;
        const { spacing } = this.state;
        
        if (this.props.event.length === 0){
            return (
                <div>
                    <p>You are not hosting any events.</p>
                </div>
            )
        } else {
        return (
            <div>
                <Grid container className={classes.demo} justify="center" spacing={Number(spacing)}>
                    <Grid item xs={3}>
                        <Paper className={classes.paper}>
                            <Card className={classes.card} className="host-card">
                                <CardContent>
                            <Typography>{this.props.event.title}</Typography>
                            <Typography>{moment(this.props.event.date).format('MM/DD/YYYY')}</Typography>
                            <CardActions>
                                <Button onClick={this.moveToHost} size="small">Event Page</Button>
                            </CardActions>
                        </CardContent>
                            </Card>
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        )
    }}
}

LandingHostItems.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(connect()(LandingHostItems));