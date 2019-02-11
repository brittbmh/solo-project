import { combineReducers } from 'redux';

const setPartyTypes = (state = [], action) => {
    switch (action.type) {
        case 'SET_PARTY_TYPES' :
            return action.payload;
        default:
            return state;
    }
}

export default combineReducers({
    setPartyTypes,
});