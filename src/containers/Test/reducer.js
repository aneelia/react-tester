import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/mapTo';
import { ajax } from 'rxjs/observable/dom/ajax';

import compose from 'ramda/src/compose';

const TEST_LOADED = '[test] TEST_LOADED';
const DATA_LOADED_FAILED = '[test] DATA_LOADED_FAILED';
const TEST_ANSWER_SUCCEED = '[test] TEST_ANSWER_SUCCEED';
const TEST_ANSWER_FAILED = '[test] TEST_ANSWER_FAILED';

// Sync Action Creators
const tasksLoadedAction = tasks => ({
  type: TEST_LOADED,
  payload: tasks
});

const testSucceedAction = ({ id }) => ({
  type: TEST_ANSWER_SUCCEED,
  payload: id
});

const testFailedAction = ({ qID, message }) => ({
  type: TEST_ANSWER_FAILED,
  payload: {
    id: qID,
    errorMessage: message
  }
});

const defaultState = {
  tasks: []
};

export default (state = defaultState, { type, payload }) => {
  switch (type) {
    case 'UPDATE_FIELD': {
      const updatedTasks = state.tasks.map(task => {
        if (task.tabKey === payload.id) {
          return { ...task, ...{ [payload.field]: payload.value } };
        }
        return task;
      });
      return { ...state, ...{ tasks: updatedTasks } };
    }
    case DATA_LOADED_FAILED: {
      console.log(payload);
      return state;
    }
    case TEST_ANSWER_SUCCEED: {
      const tasks = state.tasks.map(
        task =>
          task.tabKey === payload
            ? { ...task, ...{ result: 'success', errorMessage: '' } }
            : task
      );
      return { ...state, ...{ tasks } };
    }
    case TEST_ANSWER_FAILED: {
      const tasks = state.tasks.map(
        task =>
          task.tabKey === payload.id
            ? {
                ...task,
                ...{ result: 'failed', errorMessage: payload.errorMessage }
              }
            : task
      );
      return { ...state, ...{ tasks } };
    }

    case TEST_LOADED:
      return { ...state, ...{ tasks: payload.tasks } };

    default:
      return state;
  }
};

const fetchData = url =>
  ajax.getJSON(url).catch(err =>
    Observable.of({
      type: DATA_LOADED_FAILED,
      payload: err.xhr.response
    })
  );

const postAnswer = ({ id, code }) =>
  ajax
    .post('/api/tasks', { id, code })
    .map(response => response.response)
    .map(response => ({ id, response }));

const throwIfError = data => {
  if (!data.response.ok) {
    const err = new Error(data.response.error);
    err.qID = data.id;
    throw err;
  }
  return data;
};

export const sendAnswer = (action$, store) =>
  action$
    .ofType('SUBMIT_ANSWER')
    .switchMap(({ payload }) => postAnswer(payload))
    .map(throwIfError)
    .map(testSucceedAction)
    .catch(compose(Observable.of, testFailedAction));

export const loadTestQuestion = (action$, store) =>
  action$
    .ofType('LOAD_TASKS')
    .mapTo('/api/tasks')
    .switchMap(fetchData)
    .map(tasksLoadedAction);
