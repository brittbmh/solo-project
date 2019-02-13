import React, { Component } from 'react';
import NewEventType from './NewEventType.js';
import NewEventOptions from './NewEventOptions.js';
import NewEventDetails from './NewEventDetails.js';
import NewEventGuests from './NewEventGuests.js';
import { Switch, Route } from 'react-router-dom';
// import ProtectedRoute from '../ProtectedRoute/ProtectedRoute'

class NewEvent extends Component {
    render() {
        return (
            <div>
                <h2>Create New Party</h2>
                <br />
                <Switch>
                    <Route path='/NewEvent/Type' component={NewEventType} />
                    <Route path='/NewEvent/Options' component={NewEventOptions} />
                    <Route path='/NewEvent/Details' component={NewEventDetails} />
                    <Route path='/NewEvent/Guests' component={NewEventGuests} />
                </Switch>
            </div>
        )
    }
}

export default NewEvent;