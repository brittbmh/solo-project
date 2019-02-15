import React, {Component} from 'react';
import {connect} from 'react-redux';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

class HostPage extends Component {
    constructor(props){
        super(props);
        this.state = ({

        })
    }

    componentDidMount(){
        this.props.dispatch({ type: 'GET_PARTY_DETAILS', payload: this.props.currentEvent.eventId });
        this.props.dispatch({ type: 'GET_GUEST_LIST', payload: this.props.currentEvent.eventId });
        this.props.dispatch({ type: 'GET_INFO_FIELDS', payload: this.props.currentEvent.eventId})
    }


    

    editPage = () => {
        this.props.history.push('/editDetails');
    }

    tableDetails = () => {

    }


    render() {
        const event = this.props.currentEvent;
        return (
            <div>
                {JSON.stringify(this.props.currentEvent)}
                <h3>{event.title}</h3>
                <p>Date: {event.date}</p>
                <p>Time: {event.time_start} - {event.end_time}</p>
                <p>{event.description}</p>
                <h5>Location: {event.location}</h5>
                {JSON.stringify(this.props.infoFields)}
                <button onClick={this.editPage}>Edit Details</button>
                <br />
                <h4>Guest List</h4>
                <p>(will display guest list with response)</p>
                {JSON.stringify(this.props.guestList)}
                <Paper>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Attending</TableCell>
                                {this.props.infoFields.map((field, i) => {
                                    return (<TableCell key={i}>{field.description}</TableCell>);
                                })}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.tableDetails()}
                    </TableBody>
                </Table>
                </Paper>
                
            </div>
        )
    }
}

const mapReduxStoreToProps = (reduxStore) => ({
    currentEvent: reduxStore.events.currentEvent,
    guestList: reduxStore.host.setGuestList,
    infoFields: reduxStore.host.setInfoFields,
})

export default connect(mapReduxStoreToProps)(HostPage);