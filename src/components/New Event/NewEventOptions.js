import React, { Component } from 'react';
import { connect } from 'react-redux';

class NewEventOptions extends Component {


    componentDidMount() {
        this.getPartyOptions();
        this.props.dispatch({type: 'GET_PARTY_FIELDS'})
    }

    getPartyOptions = () => {
        this.props.dispatch({ type: 'GET_PARTY_OPTIONS', payload: this.props.newParty.partyType });
    }

    mapInfo = () => {
        return (
            this.props.partyOptions.map((option, i) => {
                console.log(option);
                return (<li>{option.description}</li>)
            })
        )
    }

    render() {
        return (
            <div>
                <h3>Select Info Needed From Guests</h3>
                <ul>
                    {this.mapInfo()}
                </ul>
                {JSON.stringify(this.props.newParty)}
                {JSON.stringify(this.props.partyOptions)}
            </div>
        )
    }
}

const mapReduxStoreToProps = (reduxStore) => ({

    newParty: reduxStore.events.setNewParty,
    partyOptions: reduxStore.events.setPartyOptions
})

export default connect(mapReduxStoreToProps)(NewEventOptions);