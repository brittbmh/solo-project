import React, { Component } from 'react';
import { connect } from 'react-redux';
import HostTableItems from './HostTableItems';
import moment from 'moment';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

class HostPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            eventId: this.props.currentEvent.eventId,
        }
    }

    componentDidMount() {
        this.props.dispatch({ type: 'GET_PARTY_DETAILS', payload: this.props.currentEvent.eventId });
        this.props.dispatch({ type: 'GET_GUEST_LIST', payload: this.props.currentEvent.eventId });
        this.props.dispatch({ type: 'GET_INFO_FIELDS', payload: this.props.currentEvent.eventId })
    }

    getGuests = (id) => {
        console.log(id);
        
        this.props.dispatch({ type: 'GET_GUEST_LIST', payload: id });
    }

    editPage = () => {
        this.props.history.push('/editDetails');
    }

    tableDetails = () => {
        return (
            this.props.guestList.map((guest, i) => {
                return (<HostTableItems key={i} getGuests={this.getGuests} eventId={this.props.currentEvent.id } infoFields={this.props.infoFields} guest={guest} />)
            })
        )
    }

   

    render() {
        const event = this.props.currentEvent;

        return (
            <div>
                {event.length}
                <h3>{event.title}</h3>
                <p>Date: {moment(event.date).format('MM/DD/YYYY')}</p>
                <p>Time: {event.time_start} - {event.end_time}</p>
                <p>{event.description}</p>
                <h5>Location: {event.location}</h5>
                <button onClick={this.editPage}>Edit Details</button>
                <br />
                <h4>Guest List</h4>
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
                                <TableCell>Delete Guest</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.props.guestList !== undefined &&
                                this.tableDetails()}
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