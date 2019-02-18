import { combineReducers } from 'redux';

const setUserEvents = (state = [], action) => {
    switch (action.type) {
        case 'SET_USER_GUEST_EVENTS':
            return action.payload;
        default:
            return state;
    }
}

export default combineReducers({
    setUserGuestEvents,

});