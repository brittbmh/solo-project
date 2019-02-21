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
        console.log('in fetchList', action.payload);
        const guests = yield axios.get(`/api/host/guests/${action.payload}`);
        console.log(guests.data);
        yield put({ type: 'SET_GUESTS', payload: guests.data })
    } catch (error) {
        yield console.log('error in fetchGuests', error);
    }
}

function* editDetails(action) {
    try{
        console.log('in edit details');
        yield axios.put(`/api/host/edit`, action.payload); 
        yield put({type: 'HOLD_CURRENT', payload: action.payload}) 
    } catch (error) {
        yield console.log('error in edit details', error);
    }
}

function* deleteGuest(action) {
    try {
        console.log(action.payload);
        yield axios.delete(`api/host/guest/${action.payload.RSVPId}`);
    } catch (error) {
        yield console.log('error in delete guest', error);
    }
}

function* hostSaga () {
    yield takeEvery('GET_PARTY_DETAILS', fetchPartyDetails);
    yield takeEvery('GET_INFO_FIELDS', fetchInfoFields);
    yield takeEvery('GET_GUEST_LIST', fetchGuestList);
    yield takeEvery('EDIT_DETAILS', editDetails);
    yield takeEvery('DELETE_GUEST', deleteGuest)
}

export default hostSaga;