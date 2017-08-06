import { combineReducers } from 'redux';

// [? 3] file structure ./type/domain vs ./domain/type(reducer,adapter,...)
import { temperatureReducer } from './temperature/reducer';
import { windReducer } from './wind/reducer';
import { conditionsReducer } from './conditions/reducer';
import { syncReducer } from './sync/reducer';


export const rootReducer = combineReducers({
    temperature   : temperatureReducer,
    wind          : windReducer,
    conditions    : conditionsReducer,
    sync          : syncReducer,
});
