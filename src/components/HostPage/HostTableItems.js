import React, { Component } from 'react';

import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

class HostTableItems extends Component {

    loadResponses = () => {
        return (
            this.props.guest.responses.map((answer, i) => {
                return (
                    <TableCell key={i}>{answer.response}</TableCell>
                )
            })
        )
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
            </TableRow>
        )
    }
}

export default HostTableItems;