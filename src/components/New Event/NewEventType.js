import React, { Component } from 'react';
import { connect } from 'react-redux';

class NewEventType extends Component {
    constructor(props) {
        super(props);

        this.state = {
            partyType: '',
        }
    }

    componentDidMount() {
        this.props.dispatch({ type: 'GET_PARTY_TYPES' });
    }

    handleChange = (event) => {
        this.setState({ partyType: event.target.value })
    }

    buildSelectInput = () => {
        const options = this.props.types.map((type, index) => {
            return (<option key={index}
                value={type.id}>
                {type.name}
            </option>
            )
        })
        return options;
    }

    sendType = (event) => {
        event.preventDefault();
        this.props.dispatch({ type: 'SET_NEW_PARTY_TYPE', payload: this.state.partyType });
        this.props.history.push('/NewEvent/Options')
    }

    render() {
        return (
            <div>
                <h3>Select Party Type:</h3>
                <form onSubmit={this.sendType} >
                    <select defaultValue='' required onChange={this.handleChange}>
                        <option value="" disabled defaultValue>Select your option</option>
                        {this.buildSelectInput()}
                    </select>
                    <button type='submit'>Set Category</button>
                </form>
            </div>
        )
    }
}

const mapReduxStoreToProps = (reduxStore) => ({
    types: reduxStore.events.setPartyTypes
})

export default connect(mapReduxStoreToProps)(NewEventType);