import {
  createStore,
  applyMiddleware,
} from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import rootReducer from './root-reducer';

const noopMiddleware = () => next => action => next(action);

const createStoreWithMiddleware = applyMiddleware(
  thunkMiddleware,
  __DEV__ ? createLogger({
    collapsed: false,
    duration: true,
  }) : noopMiddleware,
)(createStore);

export function create(initialState) {
  return createStoreWithMiddleware(rootReducer, initialState);
}
