import { combineReducers } from 'redux';

const guestDefault = { "eventId": 12,
         "attending": "true", 
         "response": [{ "id": [2], "reply": "can't wait!", desc: "note" }, 
                    { "id": [6], "reply": "no red meat", desc: "dietary restrictions" }] }

const setGuestInfo = (state = guestDefault, action) => {
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