import { all } from 'redux-saga/effects';
import loginSaga from './loginSaga';
import registrationSaga from './registrationSaga';
import eventSaga from './eventSaga';
import hostSaga from './hostSaga';
import userSaga from './userSaga';
import guestSaga from './guestSaga';
import landingSaga from './landingSaga';

// rootSaga is the primary saga.
// It bundles up all of the other sagas so our project can use them.
// This is imported in index.js as rootSaga

// some sagas trigger other sagas, as an example
// the registration triggers a login
// and login triggers setting the user
export default function* rootSaga() {
  yield all([
    loginSaga(),
    registrationSaga(),
    userSaga(),
    eventSaga(),
    hostSaga(),
    guestSaga(),
    landingSaga(),
  ]);
}
