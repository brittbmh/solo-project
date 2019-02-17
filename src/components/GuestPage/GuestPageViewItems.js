import React, { Component } from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

class GuestPageViewItems extends Component {

    loadResponses = () => {
        // return (
        //     this.props.item.map((answer, i) => {
        //         return (
        //             <TableCell key={i}>{answer.response}</TableCell>
        //         )
        //     })
        // )
    }

    componentDidMount() {
    }

    isAttending = () => {
        let attendance;
        if (this.props.guestInfo.attending === null) {
            attendance = "Not Yet Responded"
        } else if (this.props.guestInfo.attending === true) {
            attendance = 'Yes';
        } else if (this.props.guestInfo.attending === false) {
            attendance = 'No';
        }
        console.log(attendance);
        
        return attendance;
    }

    render() {
        let attendance;
        if (this.props.guestInfo.attending === null) {
            attendance = "Not Yet Responded"
        } else if (this.props.guestInfo.attending === 'true') {
            attendance = 'Yes';
        } else if (this.props.guestInfo.attending === 'false') {
            attendance = 'No';
        }


        return (
            <TableRow>
                {this.props.guestName &&
                <TableCell>{this.props.guestName.first_name} {this.props.guestName.last_name}</TableCell>}
                <TableCell>{attendance}</TableCell>
                {this.loadResponses()}
            </TableRow>


        )
    }
}




export default GuestPageViewItems;