import React, {Component} from 'react';
import {connect} from 'react-redux';
import moment from 'moment';

class GuestPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            yes: false,
            no: false
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        })
    }

    componentDidMount() {
        this.props.dispatch({ type: 'GET_PARTY_DETAILS', payload: this.props.currentEvent.eventId });
        this.props.dispatch({ type: 'GET_GUEST_LIST', payload: this.props.currentEvent.eventId });
        this.props.dispatch({ type: 'GET_INFO_FIELDS', payload: this.props.currentEvent.eventId })
    }

    editPage = () => {
        this.props.history.push('/editDetails');
    }

    makeInputs = () => {
        if (this.state.yes === true){
        return (
            this.props.infoFields.map((info, i) => {
                return(<input key={i} placeholder={info.description}></input>)
            })        
        )}
    }

    render() {
        const event = this.props.currentEvent;

        return (
            <div>
                {event.length}
                <h3>{event.title}</h3>
                <p>Date: {moment(event.date).format('MM/DD/YYYY')}</p>
                <p>Time: {event.time_start} - {event.end_time}</p>
                <p>{event.description}</p>
                <h5>Location: {event.location}</h5>
                <br />
                <h3>Are you able to come?</h3>
                <label>
                    <input
                        name="yes"
                        type="checkbox"
                        checked={this.state.yes}
                        onChange={this.handleChange} />
                    Yes, count me in
                </label>
                <label>
                    <input
                        name="no"
                        type="checkbox"
                        checked={this.state.no}
                        onChange={this.handleChange} />
                    Sorry I can't make it
                </label>
                <br />
                {this.makeInputs()}
                <br />
                <button>Submit</button>
            </div>
        )
    }
}


const mapReduxStoreToProps = (reduxStore) => ({
    currentEvent: reduxStore.events.currentEvent,
    guestList: reduxStore.host.setGuestList,
    infoFields: reduxStore.host.setInfoFields,
})

export default connect(mapReduxStoreToProps)(GuestPage);