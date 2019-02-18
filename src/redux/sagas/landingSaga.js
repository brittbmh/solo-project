import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';

function* getUserEvents(){
    try {
        const events = yield axios.get('/api/landing');
        console.log(events.data);
        yield put({type: 'SET_USER_EVENTS', payload: events.data})
    } catch (error) {
        yield console.log('error in fetchInfo', error);
    }
}

function* landingSaga() {
    yield takeEvery('GET_EVENTS', getUserEvents)
}

export default landingSaga;