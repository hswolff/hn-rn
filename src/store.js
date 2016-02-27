import {
  createStore as reduxCreateStore,
  applyMiddleware,
} from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';

export function createMiddleware(...middleware) {
  const defaultMiddleware = [
    thunkMiddleware,
  ];

  if (__DEV__) {
    defaultMiddleware.push(createLogger({
      collapsed: false,
      duration: true,
    }));
  }

  return applyMiddleware.apply(undefined, [
    ...defaultMiddleware,
    ...middleware,
  ]);
}

export function createStore(
  rootReducer,
  initialState,
  middleware = createMiddleware()
) {
  return reduxCreateStore(rootReducer, initialState, middleware);
}
