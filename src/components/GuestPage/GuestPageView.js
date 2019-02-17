import React, { Component } from 'react';
import { connect } from 'react-redux';
import GuestPageViewItems from './GuestPageViewItems';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

class GuestPageView extends Component {
    

    tableDetails = () => {
        return (
            this.props.guestInfo.response.map((item, i) => {
                return (<GuestPageViewItems guestInfo={this.props.guestInfo} key={i} item={item} />)
            })
        )
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
            <div>

                <br />
                {JSON.stringify(this.props.guestInfo)}
                {JSON.stringify(this.props.infoFields)}
                <Paper>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Attending</TableCell>
                                {this.props.guestInfo.response.map((item, i) => {
                                    return (<TableCell key={i}>{item.desc}</TableCell>);
                                })}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell>{attendance}</TableCell>
                                {this.tableDetails()}
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
})

export default connect(mapReduxStoreToProps)(GuestPageView);