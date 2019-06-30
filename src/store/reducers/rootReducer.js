import { combineReducers } from 'redux';
import formStepsReducer from './formStepsReducer';
import addUserReducer from './addUserReducer';

const rootReducer = combineReducers({
    stepState: formStepsReducer,
    userState: addUserReducer
});

export default rootReducer;