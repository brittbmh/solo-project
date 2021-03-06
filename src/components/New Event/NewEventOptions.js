import React, { Component } from 'react';
import { connect } from 'react-redux';

class NewEventOptions extends Component {
    constructor(props){
        super(props);
        this.state = {
            
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
        this.getPartyOptions();
    }

    getPartyOptions = () => {
        this.props.dispatch({ type: 'GET_PARTY_OPTIONS', payload: this.props.newParty.partyType });
    }

    setOptions = (event) => {
        event.preventDefault();
        const trueState = [];
        for (let key in this.state){
            if (this.state[key] === true){
                trueState.push(key);
            }
        }
        console.log(trueState);
        this.props.dispatch({type: 'SET_NEW_PARTY_OPTIONS', payload: trueState })
        this.props.history.push('/NewEvent/Details')
    }

    mapInfo = () => {
        return (
            this.props.partyOptions.map((option, i) => {
                const desc = option.description
                return (<label key={i}>
                        <input
                        name={option.id}
                        type="checkbox"
                        checked={this.state.desc}
                        onChange={this.handleChange}/>
                        {desc}
                </label>)
            })
        )
    }

    render() {
        return (
            <div>
                <h3>Select Info Needed From Guests</h3>
                <form onSubmit={this.setOptions}>
                    {this.mapInfo()}
                    <button type="submit">Submit</button>
                </form>
                <br/>
            </div>
        )
    }
}

const mapReduxStoreToProps = (reduxStore) => ({

    newParty: reduxStore.events.setNewParty,
    partyOptions: reduxStore.events.setPartyOptions
})

export default connect(mapReduxStoreToProps)(NewEventOptions);