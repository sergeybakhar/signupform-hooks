import { combineReducers } from 'redux';
import formStepsReducer from './formStepsReducer';

const rootReducer = combineReducers({
    stepState: formStepsReducer
});

export default rootReducer;