import { combineReducers } from 'redux';
import { stat } from 'fs';

const setPartyTypes = (state = [], action) => {
    switch (action.type) {
        case 'SET_PARTY_TYPES' :
            return action.payload;
        default:
            return state;
    }
}

const defaultParty = {
    partyType: '',
    partyOptions: ''
}

const setPartyOptions = (state = [], action) => {
    switch (action.type) {
        case 'SET_PARTY_OPTIONS':
            return action.payload;
        default: 
            return state;
    }
}

const setNewParty = (state = defaultParty, action)  => {
    switch (action.type) {
        case 'SET_NEW_PARTY_TYPE' :
            return {...stat, partyType: action.payload};
        case 'CLEAR_NEW_PARTY' :
            return defaultParty;
        default:
            return state;
    }
}

export default combineReducers({
    setPartyTypes,
    setNewParty,
    setPartyOptions
});