import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';

function* postRSVP(action) {
    try{
        const RSVP = action.payload;
        const response = yield axios.put('/api/guest', RSVP);
        const rsvp_id = response.data.rsvp_id;
        
        RSVP.rsvp_id = rsvp_id;
        console.log(RSVP);
        
        yield axios.post('/api/guest', RSVP);
        yield put({type: 'SET_GUEST_INFO', payload: RSVP});
    } catch (error) {
        alert('something went wrong');
        yield console.log('error in postRSVP', error);
    }
}

function* fetchGuestName(){
    try{
        const guest = yield axios.get('/api/guest/name');
        yield put({type: 'SET_GUEST_NAME', payload: guest.data[0]});
    } catch (error) {
        alert('something went wrong');
        yield console.log('error in fetchGuestName', error);
    }
}

function* guestSaga() {
    yield takeEvery('SEND_RSVP', postRSVP);
    yield takeEvery('GET_GUEST_NAME', fetchGuestName);
}

export default guestSaga;