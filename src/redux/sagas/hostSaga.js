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

function* fetchInfoFields(action) {
    try {
        console.log('in fetchInfo');

        const info = yield axios.get(`/api/host/info/${action.payload}`);
        console.log(info.data);
        yield put({ type: 'SET_INFO_FIELDS', payload: info.data })
    } catch (error) {
        yield console.log('error in fetchInfo', error);
    }
}

function* fetchGuestList(action) {
    try {
        console.log('in fetchList');
        const guests = yield axios.get(`/api/host/guests/${action.payload}`);
        console.log(guests.data);
        yield put({ type: 'SET_GUESTS', payload: guests.data })
    } catch (error) {
        yield console.log('error in fetchGuests', error);
    }
}

function* hostSaga () {
    yield takeEvery('GET_PARTY_DETAILS', fetchPartyDetails)
    yield takeEvery('GET_INFO_FIELDS', fetchInfoFields)
    yield takeEvery('GET_GUEST_LIST', fetchGuestList)
}

export default hostSaga;