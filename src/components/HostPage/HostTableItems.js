import React, { Component } from 'react';
import {connect} from 'react-redux';

import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';


class HostTableItems extends Component {

    loadResponses = () => {
        if (this.props.guest.responses.length > 0) {
        return (
            this.props.guest.responses.map((answer, i) => {
                return (
                    <TableCell key={i}>{answer.response}</TableCell>
                )
            }) 
            )
        } else{
            return (this.props.infoFields.map((field, i) => {
                return (<TableCell key={i}>n/a</TableCell>);
            }))
        }
    }

    deleteGuest = () => {
        const payload = {
            guestId: this.props.guest.Guest_Id,
            RSVPId: this.props.guest.RSVP_Id,
        }
        console.log(payload);
        this.props.dispatch({type: 'DELETE_GUEST', payload: payload })
        this.forceUpdate();
    }

    render() {
        let attendance;
        if (this.props.guest.attending === null) {
            attendance = "Not Yet Responded"
        } else if (this.props.guest.attending === true) {
            attendance = 'Yes';
        } else if (this.props.guest.attending === false) {
            attendance = 'No';
        }

        return (
            <TableRow>
                <TableCell>{this.props.guest.first_name} {this.props.guest.last_name}</TableCell>
                <TableCell>{this.props.guest.email}</TableCell>
                <TableCell>{attendance}</TableCell>
                {this.loadResponses()}
                <TableCell><button onClick={this.deleteGuest}>Delete</button></TableCell>
            </TableRow>
        )
    }
}

export default connect()(HostTableItems);