import { FORM_STEP } from './actionTypes.js';

export const nextStep = (step) => ({
    type: FORM_STEP,
    payload: {
        step
    }
});