import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';

function* fetchPartyTypes() {
    try{
        const partyTypes = yield axios.get('/api/events/types');
        yield put({type: 'SET_PARTY_TYPES', payload: partyTypes.data})
    }
    catch(error){
        yield console.log('error in fetchPartyTypes', error);
    }
}

function* createNewParty(action) {
    try{
        const eventId = yield axios.post('api/events/new', action.payload);
        yield put({type: 'SET_EVENT_ID', payload: eventId.data})
        yield put({type: 'CLEAR_NEW_PARTY'})
    } 
    catch (error){
        alert('something went wrong');
        yield console.log('error in createNewParty', error);
    }
}

function* fetchPartyOptions(action) {
    try {
        console.log(action.payload);
        const partyOptions = yield axios.get(`/api/events/options/${action.payload}`);
        yield put({ type: 'SET_PARTY_OPTIONS', payload: partyOptions.data })
    }
    catch (error) {
        yield console.log('error in fetchPartyOptions', error);
    }
}


function* eventSaga() {
    yield takeEvery('GET_PARTY_TYPES', fetchPartyTypes);
    yield takeEvery('GET_PARTY_OPTIONS', fetchPartyOptions);
    yield takeEvery('CREATE_NEW_EVENT', createNewParty);
}

export default eventSaga;