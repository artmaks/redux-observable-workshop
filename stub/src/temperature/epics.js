import { FetchEpic } from '../common/epic-creators';

import {
  FETCH,
  FETCH_DONE,
  FETCH_FAILED,
} from './reducer';

import { fetchTemperature } from './adapter';


export const temperatureFetchEpic = FetchEpic({
  triggerActionType : FETCH,
  successActionType : FETCH_DONE,
  failedActionType  : FETCH_FAILED,
  fetchFunction     : fetchTemperature,
});
