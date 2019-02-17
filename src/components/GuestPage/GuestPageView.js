import React, {Component} from 'react';
import {connect} from 'react-redux';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

class GuestPageView extends Component{
    render(){
        return(
            <div>
                <br/>
                {JSON.stringify(this.props.guestInfo)}
                {JSON.stringify(this.props.infoFields)}
                <Paper>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>Attending</TableCell>
                                {this.props.guestInfo.response.map((item, i) => {
                                    return (<TableCell key={i}>{item.desc}</TableCell>);
                                })}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {/* {this.tableDetails()} */}
                        </TableBody>
                    </Table>
                </Paper>
            </div>
        )
    }
}

const mapReduxStoreToProps = (reduxStore) => ({
    guestInfo: reduxStore.guest.setGuestInfo
})

export default connect(mapReduxStoreToProps)(GuestPageView);