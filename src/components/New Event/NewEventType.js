import React, { Component} from 'react';
import { connect } from 'react-redux';

class NewEventType extends Component {

    componentDidMount() {
        
    }

    getTypes = () => {
        this.props.dispatch({ type: 'GET_PARTY_TYPES' })
    }

    render () {
        return (
            <div>
                <h3>Select Party Type:</h3>
                <button onClick={this.getTypes}>Click</button>
                {/* <form >
                    <select >
                    </select>
                    <button type='submit'>Set Category</button>
                </form> */}
            </div>
        )
    }
}

const mapReduxStoreToProps = (reduxStore) => ({
    types: reduxStore.events.setPartyTypes
})

export default connect(mapReduxStoreToProps)(NewEventType);