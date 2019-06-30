import { ADD_USER } from '../actions/actionTypes';

const initialState = {};

export default function (state = initialState, action) {
    switch (action.type) {
        case ADD_USER:
            return {
                user: action.payload.user
            };
        default:
            return state;
    }
}

