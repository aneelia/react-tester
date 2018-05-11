import { createStore, combineReducers, applyMiddleware } from 'redux';
import { combineEpics, createEpicMiddleware } from 'redux-observable';
import test, { loadTestQuestion, sendAnswer } from './containers/Test/reducer';

const rootEpic = combineEpics(loadTestQuestion, sendAnswer);

const epicMiddleware = createEpicMiddleware(rootEpic);

const middlewares = [epicMiddleware];

const reducers = combineReducers({
  test
});

export default createStore(reducers, applyMiddleware(...middlewares));
