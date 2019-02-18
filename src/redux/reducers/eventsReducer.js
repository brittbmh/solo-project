import { combineReducers } from 'redux';

const setPartyTypes = (state = [], action) => {
    switch (action.type) {
        case 'SET_PARTY_TYPES':
            return action.payload;
        default:
            return state;
    }
}


const setPartyOptions = (state = [], action) => {
    switch (action.type) {
        case 'SET_PARTY_OPTIONS':
            return action.payload;
        default:
            return state;
    }
}



const currentEvent = (state = {}, action) => {
    switch (action.type) {
        case 'SET_EVENT_ID':
            return {...state, eventId: action.payload.eventId};
        case 'SET_EVENT_NAME':
            return {...state, name: action.payload[0].title};
        case 'HOLD_CURRENT':
            return action.payload;
        case 'CLEAR_CURRENT_EVENT':
            return {};
        default:
            return state;
    }
}


const guestList = (state = [], action ) => {
    switch (action.type) {
        case 'ADD_GUEST' :
            return [...state, action.payload];
        case 'CLEAR_GUESTS':
            return [];
        default:
            return state;
    }
}



const setNewParty = (state = {}, action) => {
    switch (action.type) {
        case 'SET_NEW_PARTY_TYPE':
            return { ...state, partyType: action.payload };
        case 'SET_NEW_PARTY_OPTIONS':
            return { ...state, partyOptions: action.payload };
        case 'SET_NEW_PARTY_DETAILS':
            return { ...state, partyDetails: action.payload };
        case 'CLEAR_NEW_PARTY':
            return {};
        default:
            return state;
    }
}

export default combineReducers({
    setPartyTypes,
    setNewParty,
    setPartyOptions,
    currentEvent,
    guestList
});