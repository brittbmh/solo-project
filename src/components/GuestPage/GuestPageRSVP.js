import React, { Component } from 'react';

class GuestPageRSVP extends Component {

    constructor(props) {
        super(props);
        this.state = {
            
            attending: '',
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleResponse= this.handleResponse.bind(this);
    }

    handleChange(event) {
        const target = event.target;
        this.setState({
            attending : target.value
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
        if (this.state.attending === 'yes') {
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
            const RSVP = {
             eventId: this.props.eventId, response: this.state 
            }
            this.props.dispatch({type: 'SEND_RSVP', payload: RSVP})
    }

    render() {
        return (
            <div>
                <h3>Are you able to come?</h3>
                <label>
                    <input
                        name="attending"
                        type="radio"
                        value="yes"
                        checked={this.state.attending === 'yes'}
                        onChange={this.handleChange} />
                    Yes, count me in
                </label>
                <label>
                    <input
                        name="attending"
                        type="radio"
                        value="no"
                        checked={this.state.attending === 'no'}
                        onChange={this.handleChange} />
                    Sorry, I can't make it
                </label>
                <br />
                {this.makeInputs()}
                <br />
                <button onClick={this.props.sendRSVP}>Submit</button>
                {JSON.stringify(this.state)}
            </div>
        )
    }
}

export default GuestPageRSVP;