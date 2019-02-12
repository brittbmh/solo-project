import React, { Component } from 'react';
import { connect } from 'react-redux';

class NewEventOptions extends Component {


    componentDidMount() {
        this.props.dispatch({ type: 'GET_PARTY_OPTIONS' });
    }

    render() {
        return (
            <div></div>
        )
    }
}

const mapReduxStoreToProps = (reduxStore) => ({
    partyType: reduxStore.events.setNewParty,
    partyOptions: reduxStore.events.setPartyOptions
})

export default connect(mapReduxStoreToProps)(NewEventOptions);