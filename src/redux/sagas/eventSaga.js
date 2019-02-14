import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';

function* fetchPartyTypes() {
    try{
        const partyTypes = yield axios.get('/api/events/types');
        yield put({type: 'SET_PARTY_TYPES', payload: partyTypes.data})
    }
    catch(error){
        yield console.log('error in fetchPartyTypes', error);
    }
}

function* createNewParty(action) {
    try{
        const eventId = yield axios.post('api/events/new', action.payload);
        yield put({type: 'SET_EVENT_ID', payload: eventId.data})
        yield put({type: 'CLEAR_NEW_PARTY'})
    } 
    catch (error){
        alert('something went wrong');
        yield console.log('error in createNewParty', error);
    }
}

function* postGuests(action) {
    try{
        yield axios.post('api/events/guests', action.payload);
        yield put({type: 'CLEAR_GUESTS'})
    } catch (error) {
        alert('something went wrong');
        yield console.log('error in postGuests', error);
    }
}

function* fetchPartyOptions(action) {
    try {
        console.log(action.payload);
        const partyOptions = yield axios.get(`/api/events/options/${action.payload}`);
        console.log(partyOptions);
        
        yield put({ type: 'SET_PARTY_OPTIONS', payload: partyOptions.data })
    }
    catch (error) {
        yield console.log('error in fetchPartyOptions', error);
    }
}

function* fetchEventName(action) {
    try{
        const eventName = yield axios.get(`api/events/name/${action.payload}`);
        console.log(eventName);
        
        yield put({type: 'SET_EVENT_NAME', payload: eventName.data})
    }
    catch(error){
        yield console.log('error in fetchEventName', error);
    }
}

//match new guest against database and pull user id
function* matchGuest(action) {
    try {
        console.log(action.payload);
        const newGuest = action.payload;
        const email = action.payload.email;
        const guest = yield axios.get(`api/events/user/${email}`);
        console.log(guest);
        newGuest.id = guest.data[0].id;
        console.log(newGuest);
        //send new guest with id to reducer
        yield put({type: 'ADD_GUEST', payload: newGuest})
    } catch (error) {
        yield console.log('error in matchGuest', error);
    }
}


function* eventSaga() {
    yield takeEvery('GET_PARTY_TYPES', fetchPartyTypes);
    yield takeEvery('GET_PARTY_OPTIONS', fetchPartyOptions);
    yield takeEvery('CREATE_NEW_EVENT', createNewParty);
    yield takeEvery('GET_CURRENT_PARTY', fetchEventName);
    yield takeEvery('MATCH_GUEST', matchGuest);
    yield takeEvery('POST_GUEST_LIST', postGuests);
}

export default eventSaga;