import React, {Component} from 'react';
import {connect} from 'react-redux';

class GuestPageView extends Component{
    render(){
        return(
            <div>
                {JSON.stringify(this.props.guestInfo)}
            </div>
        )
    }
}

const mapReduxStoreToProps = (reduxStore) => ({
    guestInfo: reduxStore.guest.setGuestInfo
})

export default connect(mapReduxStoreToProps)(GuestPageView);