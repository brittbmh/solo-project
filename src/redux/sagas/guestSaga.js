import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';

function* postRSVP() {
    try{
        yield axios.post('api/guests', action.payload)
        yield put({type: 'SET_GUEST_INFO', payload: action.payload})
    } catch (error) {
        alert('something went wrong');
        yield console.log('error in postRSVP', error);
    }
}

function* guestSaga() {
    yield takeEvery('SEND_RSVP', postRSVP)
}

export default guestSaga;