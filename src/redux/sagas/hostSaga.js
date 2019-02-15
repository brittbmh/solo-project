import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';

function* fetchPartyDetails(action) {
    try{
        console.log('in fetchDetails');
        
        const details = yield axios.get(`/api/host/${action.payload}`);
        console.log(details.data);
        yield put({type:'HOLD_CURRENT', payload: details.data[0]})
    } catch (error) {
        yield console.log('error in fetchDetails', error);
    }
}

function* fetchGuestList(action) {
    try {
        console.log('in fetchList');

        const guests = yield axios.get(`/api/host/guests/${action.payload}`);
        console.log(guests.data);
        yield put({ type: 'SET_GUESTS', payload: guests.data[0] })
    } catch (error) {
        yield console.log('error in fetchGuests', error);
    }
}

function* hostSaga () {
    yield takeEvery('GET_PARTY_DETAILS', fetchPartyDetails)
    yield takeEvery('GET_GUEST_LIST', fetchGuestList)
}

export default hostSaga;