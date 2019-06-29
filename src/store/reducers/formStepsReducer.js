import { FORM_STEP } from '../actions/actionTypes';

const initialState = {
    step: 1
};

export default function (state = initialState, action) {
    switch (action.type) {
        case FORM_STEP:
            return {
                step: state.step + action.payload.step
            };
        default:
            return state;
    }
};