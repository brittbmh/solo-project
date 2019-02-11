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


function* eventSaga() {
    yield takeEvery('GET_PARTY_TYPES', fetchPartyTypes);
}

export default eventSaga;