// [? 10] state could be scalar value
// possible values:
// rain
// hail
// snow
// lightning
// thunderstorm
// meteor
// rain
// windy
// fog
// hot
// sunny
const initialState = 'snow';

export const CALC_CONDITIONS = 'summary.calcConditions';

export const conditionsReducer = (state = initialState, action) => {
    return state;
};
