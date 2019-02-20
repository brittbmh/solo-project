import React, { Component } from 'react';
import { connect } from 'react-redux';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

class GuestPageView extends Component {

    componentDidMount() {
        this.props.dispatch({ type: 'GET_GUEST_INFO', payload: { id: this.props.eventId} })
    }

    tableDetails = () => {
        return (
            this.props.guestInfo.response.map((item, i) => {
                return (<TableCell key={i}>{item.reply}</TableCell>)
            })
        )
    }

    render() {
        const guestStuff = this.props.guestInfo;
        let attendance;
        if (guestStuff.attending === null) {
            attendance = "Not Yet Responded"
        } else if (guestStuff.attending === 'true' || guestStuff.attending === true) {
            attendance = 'Yes';
        } else if (guestStuff.attending === 'false' || guestStuff.attending === false) {
            attendance = 'No';
        }
        console.log(this.props.eventId);
        
        return (

            <div>
                <br />
                {JSON.stringify(this.props.guestInfo)}
                <h5>Your Response</h5>
                {JSON.stringify(this.props.guestResponse)}
                <Paper>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Attending</TableCell>
                                {this.props.guestInfo.response !== undefined &&
                                    guestStuff.response.map((item, i) => {
                                        return (<TableCell key={i}>{item.desc}</TableCell>);
                                    })}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell>{attendance}</TableCell>
                                {  this.props.guestInfo.response !== undefined &&
                                    this.tableDetails()}
                            </TableRow>
                        </TableBody>
                    </Table>
                </Paper>
            </div>
        )
    }
}

const mapReduxStoreToProps = (reduxStore) => ({
    guestInfo: reduxStore.guest.setGuestInfo,
    guestResponse: reduxStore.host.setGuestList
})

export default connect(mapReduxStoreToProps)(GuestPageView);