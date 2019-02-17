import React, {Component} from 'react';
import {connect} from 'react-redux';
import GuestPageViewItems from './GuestPageViewItems';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

class GuestPageView extends Component{
    componentDidMount(){
        this.props.dispatch({type: 'GET_GUEST_NAME'})
    }

    tableDetails = () => {
        const thisGuest = this.props.guest[0];
        console.log(thisGuest);
        
        return (
            this.props.guestInfo.response.map((item, i) => {
                return (<GuestPageViewItems guestName={thisGuest} guestInfo={this.props.guestInfo} key={i} item={item} />)
            })
        )
    }

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
                            {this.tableDetails()}
                            
                        </TableBody>
                    </Table>
                </Paper>
                {JSON.stringify(this.props.guest[0])}
            </div>
        )
    }
}

const mapReduxStoreToProps = (reduxStore) => ({
    guestInfo: reduxStore.guest.setGuestInfo,
    guest: reduxStore.guest.setGuestName
})

export default connect(mapReduxStoreToProps)(GuestPageView);