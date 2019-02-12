import { combineReducers } from 'redux';

const setPartyTypes = (state = [], action) => {
    switch (action.type) {
        case 'SET_PARTY_TYPES' :
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

const setNewParty = (state = [], action)  => {
    switch (action.type) {
        case 'SET_NEW_PARTY' :
            return [...state, action.payload];
        case 'CLEAR_NEW_PARTY' :
            return [];
        default:
            return state;
    }
}

export default combineReducers({
    setPartyTypes,
    setNewParty,
    setPartyOptions
});