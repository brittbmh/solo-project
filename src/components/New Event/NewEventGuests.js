import React, {Component} from 'react';
import {connect} from 'react-redux';

class NewEventGuests extends Component {
    constructor(props){
        super(props);
        this.state = {
            guest: '',
            email: ''
        }
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        this.getParty();
    }

    getParty = () => {
        console.log(this.props.currentEvent.eventId);
        
        this.props.dispatch({ type: 'GET_CURRENT_PARTY', payload: this.props.currentEvent.eventId });
    }

    handleChange(event) {
        const target = event.target;
        const value = event.target.value;
        const name = target.name;
        this.setState({
            [name]: value
        })
    }

    //verify guest is a user and then hold in reducer
    addGuest = (event) => {
        event.preventDefault();
        this.props.dispatch({type:'MATCH_GUEST', payload: this.state})
    }

    guestDetails = () => {
        return (
            this.props.guestList.map((guest, i) => {
                return (<tr key={i}><td>{guest.guest}</td><td>{guest.email}</td></tr>);
            })
        )
    }

    submitGuests = () => {
        const payload = {
            eventId: this.props.currentEvent.eventId,
            guestList: this.props.guestList
        }
        this.props.dispatch({type: 'POST_GUEST_LIST', payload: payload});
        this.props.history.push('/hostpage');
    }

    render() {
        return (
            <div>
                
                <h3>{this.props.currentEvent.name}</h3>
                <h4>Enter Guest Information</h4>
                <input name="guest" type="text" placeholder="Guest Name" onChange={this.handleChange} />
                <input name="email" type="text" placeholder="Guest Email" onChange={this.handleChange} />
                <button onClick={this.addGuest}>Add Guest</button>
                {JSON.stringify(this.props.currentEvent)}
                {JSON.stringify(this.state)}
                {JSON.stringify(this.props.guestList)}
                <br />
                <table>
                    <th>
                        <td>Guest Name</td>
                        <td>Guest Email</td>
                    </th>
                    <tbody>
                        {this.guestDetails()}
                    </tbody>
                </table>
                <h4>Review Guest List and Submit</h4>
                <button onClick={this.submitGuests}>Submit List</button>
            </div>
        )
    }
}

const mapReduxStoreToProps = (reduxStore) => ({
    guestList: reduxStore.events.guestList,
    currentEvent: reduxStore.events.currentEvent,
})

export default connect(mapReduxStoreToProps)(NewEventGuests);