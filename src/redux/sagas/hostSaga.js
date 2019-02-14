import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';

function* fetchPartyDetails(action) {
    try{
        console.log('in fetch');
        
        const details = yield axios.get(`/api/host/${action.payload}`);
        console.log(details.data);
        yield put({type:'HOLD_CURRENT', payload: details.data[0]})
    } catch (error) {
        yield console.log('error in matchGuest', error);
    }
}

function* hostSaga () {
    yield takeEvery('GET_PARTY_DETAILS', fetchPartyDetails)
}

export default hostSaga;