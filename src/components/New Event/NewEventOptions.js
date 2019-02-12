import React, { Component } from 'react';
import { connect } from 'react-redux';

class NewEventOptions extends Component {


    componentDidMount() {
        this.getPartyOptions();
    }

    getPartyOptions = () => {
        this.props.dispatch({ type: 'GET_PARTY_OPTIONS', payload: this.props.newParty.partyType });
    }

    render() {
        return (
            <div>
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