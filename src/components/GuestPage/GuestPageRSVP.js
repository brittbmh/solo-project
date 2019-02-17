import React, { Component } from 'react';
import {connect} from 'react-redux';

class GuestPageRSVP extends Component {

    constructor(props) {
        super(props);
        this.state = {

            attending: '',
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleResponse = this.handleResponse.bind(this);
    }

    handleChange(event) {
        const target = event.target;
        this.setState({
            attending: target.value
        })
    }

    handleResponse(event) {
        const target = event.target;
        const name = target.name;
        console.log(target.value);

        this.setState({
            [name]: target.value
        })
    }

    makeInputs = () => {
        if (this.state.attending === 'true') {
            return (
                this.props.infoFields.map((info, i) => {
                    return (<label>{info.description}<input key={i} name={info.id} onChange={this.handleResponse} placeholder={info.description}></input>
                    </label>
                    )
                })
            )
        } 
    }

    sendRSVP = () => {
        const response = [];
        this.props.infoFields.map((info) => {
            let id = info.id
            let idString = id.toString();
            response.push({id: [id], reply: this.state[idString], desc: info.description});
            return response;
        })
        const RSVP = {
            eventId: this.props.eventId,
            attending: this.state.attending,
            response: response,
        }
        
        this.props.dispatch({ type: 'SEND_RSVP', payload: RSVP })
        this.props.history.push('/guestpage/view')
    }

    render() {
        return (
            <div>
                <h3>Are you able to come?</h3>
                <label>
                    <input
                        name="attending"
                        type="radio"
                        value="true"
                        checked={this.state.attending === 'true'}
                        onChange={this.handleChange} />
                    Yes, count me in
                </label>
                <label>
                    <input
                        name="attending"
                        type="radio"
                        value="false"
                        checked={this.state.attending === 'false'}
                        onChange={this.handleChange} />
                    Sorry, I can't make it
                </label>
                <br />
                {this.makeInputs()}
                <br />
                <button onClick={this.sendRSVP}>Submit</button>
                {JSON.stringify(this.state)}
            </div>
        )
    }
}

export default connect()(GuestPageRSVP);