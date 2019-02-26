import { combineReducers } from 'redux';

const setGuestList = (state = [], action) => {
    switch (action.type) {
        case 'SET_GUESTS':
            return action.payload.RSVP;
        default:
            return state;
    }
}

const setInfoFields = (state = [], action) => {
    switch (action.type) {
        case 'SET_INFO_FIELDS':
            return action.payload;
        default:
            return state;
    }
}

export default combineReducers({
    setGuestList,
    setInfoFields
});

export {setGuestList}