import React, {Component} from 'react';
import {connect} from 'react-redux';

class HostPage extends Component {
    constructor(props){
        super(props);
        this.state = ({

        })
    }

    componentDidMount(){
        this.getCurrentEvent();
    }

    getCurrentEvent = () => {
        this.props.dispatch({type: 'GET_PARTY_DETAILS', payload: this.props.currentEvent.eventId})
    }

    editPage = () => {
        this.props.history.push('/editDetails');
    }

    render() {
        const event = this.props.currentEvent;
        return (
            <div>
                {/* {JSON.stringify(this.props.currentEvent)} */}
                <h3>{event.title}</h3>
                <p>Date: {event.date}</p>
                <p>Time: {event.time_start} - {event.end_time}</p>
                <p>{event.description}</p>
                <h5>Location: {event.location}</h5>
                <button onClick={this.editPage}>Edit Details</button>
                <br />
                <h4>Guest List</h4>
                <p>(will display guest list with response)</p>
            </div>
        )
    }
}

const mapReduxStoreToProps = (reduxStore) => ({
    currentEvent: reduxStore.events.currentEvent,
})

export default connect(mapReduxStoreToProps)(HostPage);