import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';

function* postRSVP() {

}

function* guestSaga() {
    yield takeEvery('SEND_RSVP')
}

export default guestSaga;