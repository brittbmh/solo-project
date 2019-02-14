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

    render() {
        return (
            <div></div>
        )
    }
}

const mapReduxStoreToProps = (reduxStore) => ({
    currentEvent: reduxStore.events.currentEvent,
})

export default connect(mapReduxStoreToProps)(HostPage);