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
});