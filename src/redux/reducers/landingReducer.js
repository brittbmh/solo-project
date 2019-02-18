import { combineReducers } from 'redux';

const setUserGuestEvents = (state = [], action) => {
    switch (action.type) {
        case 'SET_USER_GUEST_EVENTS':
            return action.payload;
        default:
            return state;
    }
}

const setUserHostEvents = (state = [], action) => {
    switch (action.type) {
        case 'SET_USER_HOST_EVENTS':
            return action.payload;
        default:
            return state;
    }
}

export default combineReducers({
    setUserGuestEvents,
    setUserHostEvents,

});