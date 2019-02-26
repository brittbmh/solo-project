import {setGuestList} from '../redux/reducers/hostReducer';

test('setGuestList should initially return an empty array', () => {
    const action = {};
    const returnedState = setGuestList(undefined, action);
    expect(returnedState).toEqual([]);
});

test('setGuestList should return the payload.RSVP when called', () => {
    const action = { type: 'SET_GUESTS', payload: {RSVP: true} };
    const state = [];
    expect(setGuestList(state, action)).toBe(true);
});

test('setGuestList should ignore unrelated action', () => {
    const action = {type: 'IGNORE_ME'};
    const state = undefined;
    expect(setGuestList(state, action)).toEqual([]);
});