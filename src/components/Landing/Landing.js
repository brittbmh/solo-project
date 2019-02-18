import React, {Component} from 'react';
import { connect } from 'react-redux';

class Landing extends Component{

    componentDidMount(){
        this.props.dispatch({type: 'GET_EVENTS'});
    }

    render(){
        return(
            <div>
                <h2>Party List</h2>
                



            </div>
        )
    }
}

export default connect()(Landing);