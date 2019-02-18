import { combineReducers } from 'redux';


const setGuestInfo = (state = {}, action) => {
    switch (action.type) {
        case 'SET_GUEST_INFO':
            return action.payload;
        default:
            return state;
    }
}

const setGuestName = (state = [], action) => {
    switch (action.type) {
        case 'SET_GUEST_NAME':
            return action.payload;
        default:
            return state;
    }
}


export default combineReducers({
    setGuestInfo,
    setGuestName
});