import { combineReducers } from 'redux';
import sagaMiddlewareFactory from 'redux-saga';

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

const defaultEvent ={
    eventId: 12,
}

const currentEvent = (state = defaultEvent, action) => {
    switch (action.type) {
        case 'SET_EVENT_ID':
            return {...state, eventId: action.payload.eventId};
        case 'SET_EVENT_NAME':
        console.log(action.payload);
            return {...state, name: action.payload[0].title}
        default:
            return state;
    }
}
const defaultGuest = [{guest: 'Sam', email: 'sam@gmailx.com', id: 2}];

const guestList = (state = defaultGuest, action ) => {
    switch (action.type) {
        case 'ADD_GUEST' :
            return [...state, action.payload];
        case 'CLEAR_GUESTS':
            return defaultGuest;
        default:
            return state;
    }
}

const defaultParty = {
    partyType: '9',
    partyOptions: ["2", "6"],
    partyDetails: {
        title: "Bee's Party",
        date: "2/11/19",
        description: "PARTY!!",
        endTime: "5:30",
        location: "My House",
        startTime: "4:30"
    }
}

const setNewParty = (state = defaultParty, action) => {
    switch (action.type) {
        case 'SET_NEW_PARTY_TYPE':
            return { ...state, partyType: action.payload };
        case 'SET_NEW_PARTY_OPTIONS':
            return { ...state, partyOptions: action.payload };
        case 'SET_NEW_PARTY_DETAILS':
            return { ...state, partyDetails: action.payload };
        case 'CLEAR_NEW_PARTY':
            return defaultParty;
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