import React, {Component} from 'react';
import { connect } from 'react-redux';

class Landing extends Component{

    componentDidMount(){
        this.props.dispatch({type: 'GET_EVENTS'});
    }

    render(){
        return(
            <div>
                <h2>Party List</h2>
                {JSON.stringify(this.props.userGuestEvents)}
                <br/>
                {JSON.stringify(this.props.userHostEvents)}


            </div>
        )
    }
}

const mapReduxStoreToProps = (reduxStore) => ({
    userGuestEvents: reduxStore.landing.setUserGuestEvents,
    userHostEvents: reduxStore.landing.setUserHostEvents
})

export default connect(mapReduxStoreToProps)(Landing);