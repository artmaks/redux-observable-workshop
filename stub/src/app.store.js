import {
  createStore,
  compose,
  applyMiddleware
} from 'redux';

import { rootReducer } from './app.reducer';
import { rootEpic } from './app.epics';

import { createEpicMiddleware } from 'redux-observable';

// http://extension.remotedev.io/#usage
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const epicsMiddleware  = createEpicMiddleware(rootEpic);
export const appStore = createStore(rootReducer, /* preloadedState, */ composeEnhancers(
    applyMiddleware(epicsMiddleware),
));
