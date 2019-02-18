import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';

function* getUserEvents(){
    try {
        const events = yield axios.get('/api/landing');
        console.log(events.data);
        const hostEvents = yield axios.get('/api/landing/host');
        console.log(hostEvents.data);
        yield put({type: 'SET_USER_HOST_EVENTS', payload: hostEvents.data})
        yield put({type: 'SET_USER_GUEST_EVENTS', payload: events.data})
    } catch (error) {
        yield console.log('error in fetchInfo', error);
    }
}

function* landingSaga() {
    yield takeEvery('GET_EVENTS', getUserEvents)
}

export default landingSaga;