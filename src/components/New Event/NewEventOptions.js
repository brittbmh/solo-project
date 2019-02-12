import React, { Component} from 'react';

class NewEventOptions extends Component {


    componentDidMount() {
        this.props.dispatch({ type: 'GET_PARTY_TYPES' });
    }

    render() {
        return(
            <div></div>
        )
    }
}

export default NewEventOptions;