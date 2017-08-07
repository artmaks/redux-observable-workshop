import {
  commonInitialState,
  commonFetchActionHandler,
  commonFetchDoneActionHandler,
  commonFetchFailedActionHandler,
} from '../common/reducer';


export const FETCH        = 'temperature.fetch';
export const FETCH_DONE   = 'temperature.fetch.done';
export const FETCH_FAILED = 'temperature.fetch.failed';


export const temperatureReducer = (state = commonInitialState,action) => {

    switch (action.type) {
        // [? 1]
        case FETCH        : return commonFetchActionHandler(state,action);
        case FETCH_DONE   : return commonFetchDoneActionHandler(state,action);
        case FETCH_FAILED : return commonFetchFailedActionHandler(state,action);
        default:
            return state;
    }

};