import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';

function* postRSVP() {
    try{
        yield axios.post()
        
    }
}

function* guestSaga() {
    yield takeEvery('SEND_RSVP')
}

export default guestSaga;