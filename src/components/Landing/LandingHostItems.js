import React, {Component} from 'react';
import moment from 'moment';

//card styling
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

moveToEvent = () => {
    
}

class LandingHostItems extends Component{
    render(){
        return(
            <div>
                <Grid item md={2}>
                    <Card className="host-card">
                    <CardContent>
                        <Typography>{this.props.event.title}</Typography>
                        <Typography>{moment(this.props.event.date).format('MM/DD/YYYY')}</Typography>
                        <CardActions>
                            <Button onclick={this.moveToEvent} size="small">Event Page</Button>
                        </CardActions>
                    </CardContent>
                </Card>
                </Grid>
            </div>
        )
    }
}

export default LandingHostItems;